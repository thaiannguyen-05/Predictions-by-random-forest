import { Injectable } from "@nestjs/common";
import { User } from "prisma/generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { Payload } from "../auth.interface";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { hash } from "argon2";
import { Response } from "express";
import { AUTH_CONSTANT } from "../auth.constants";
import { EmailProducer } from "src/email/emai.producer";
@Injectable()
export class AuthTokenSerivec {

	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly emailProducer: EmailProducer
	) { }

	// generate tokens
	async generateTokens(user: User) {
		// payload
		const payload: Payload = {
			sub: user.id,
			email: user.email,
			createdAt: user.createdAt
		}

		// generate accessToken and refreshToken
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: this.configService.getOrThrow<string>("JWT_SECRET"),
				expiresIn: this.configService.getOrThrow<string>("TIME_LIFE_ACCESS_TOKEN")
			}),
			this.jwtService.signAsync(payload, {
				secret: this.configService.getOrThrow<string>("JWT_SECRET"),
				expiresIn: this.configService.getOrThrow<string>("TIME_LIFE_REFRESH_TOKEN")
			})
		])

		return { accessToken, refreshToken }
	}

	// create session
	async storeSession(user: User, userIp: string, userDevice: string, hashedRefreshToken: string) {
		// check sesison
		const device = await this.prismaService.userDevice.findUnique({
			where: { nameDevice_userId: { nameDevice: userDevice, userId: user.id } }
		})

		const session = device ? await this.prismaService.session.findUnique({
			where: { userId_userDeviceId: { userDeviceId: device.id, userId: user.id } }
		}) : null

		if (!session) {
			// check if session is not available -> create userdevice and new session
			// new device notification
			await this.emailProducer.sendDetectOtherDevice({ to: user.email, username: user.username })
			const newUserDevice = await this.prismaService.userDevice.create({
				data: {
					nameDevice: userDevice,
					userId: user.id
				}
			})

			const session = await this.prismaService.session.create({
				data: {
					hashedRefreshToken,
					userIp,
					userDeviceId: newUserDevice.id,
					userId: user.id
				}
			})

			return session
		}

		// if sesison is available -> update new refresh token and user ip 
		return await this.prismaService.session.update({
			where: { id: session.id },
			data: {
				hashedRefreshToken,
				userIp
			}
		})
	}

	// create session
	async createSession(user: User, ip: string, userAgent: string, res: Response) {
		const tokens = await this.generateTokens(user)
		const hashedRefreshToken = await hash(tokens.refreshToken)
		const session = await this.storeSession(user, ip, userAgent, hashedRefreshToken)

		// set config 
		res
			.cookie('session_id', session.id, {
				maxAge: AUTH_CONSTANT.TIME_LIFE_SESSION,
				...AUTH_CONSTANT.COOKIE_CONFIG.SESSION
			})
			.cookie('access_token', tokens.accessToken, {
				maxAge: AUTH_CONSTANT.TIME_LIFE_ACCESS_TOKEN,
				...AUTH_CONSTANT.COOKIE_CONFIG.ACCESS_TOKEN
			})
			.cookie('refresh_token', tokens.refreshToken, {
				maxAge: AUTH_CONSTANT.TIME_LIFE_REFRESH_TOKEN,
				...AUTH_CONSTANT.COOKIE_CONFIG.REFRESH_TOKEN
			})

		return { session, tokens }
	}
}