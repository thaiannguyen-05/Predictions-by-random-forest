import { Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { ChangeDetailDto } from "./dto/change-detail.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { DateUtils } from "src/common/utils/string-to-date.utils";
import { LoginUserDto } from "./dto/login-user.dto";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { User } from "@prisma/client";
@Injectable()
export class UserService {
	private users: User[] = [];
	constructor(
		private readonly prismaService: PrismaService
	) { }

	// check available user and active user
	private async getActiveAccount(userId: string) {
		return await this.prismaService.user.findFirst({
			where: {
				AND: [
					{
						id: userId
					}, {
						isActive: true
					}

				]
			},
			omit: { hashedPassword: false }
		})
	}

	// change detail
	async changeDetail(req: Request, dto: ChangeDetailDto) {
		// get userid
		const userId = req.user?.id || 'unknow'
		// validate user
		const user = await this.getActiveAccount(userId)
		if (!user) throw new NotFoundException("User not found or not active")

		// trans date time
		const dateOfBirth = dto.dateOfBirth ? DateUtils.stringToBirthday(dto.dateOfBirth) : undefined

		// update data
		const newUser = await this.prismaService.user.update({
			where: { id: user.id },
			data: {
				...(dto.username && { username: dto.username }),
				...(dto.firstName && { firstName: dto.firstName }),
				...(dto.lastName && { lastName: dto.lastName }),
				...(dto.phoneNumber && { phoneNumber: dto.phoneNumber }),
				...(dto.dateOfBirth && { dateOfBirth: dateOfBirth }),
				...(dto.avtUrl && { avtUrl: dto.avtUrl })
			}
		})

		// Remove hashedPassword before returning
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { hashedPassword, ...userWithoutPassword } = newUser;
		return {
			status: true,
			data: userWithoutPassword
		}
	}

}