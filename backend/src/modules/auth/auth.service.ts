import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2'
import { CreateAccountDto } from './dto/create-account.dto';
import { DateUtils } from 'src/common/utils/string-to-date.utils';
import { EmailProducer } from 'src/email/emai.producer';
import { VerifyAccount } from './dto/verify-account.dto';
@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly emailProducer: EmailProducer
	) { }

	// check available account
	private async getAccountWithId(email: string) {
		return await this.prismaService.user.findUnique({ where: { email } })
	}

	// genereate code 
	private generateVerificationCode(): string {
		return Math.floor(100000 + Math.random() * 900000).toString();
	}

	// register
	async register(dto: CreateAccountDto) {
		// checking available account
		const account = await this.getAccountWithId(dto.email)
		if (account) throw new ConflictException("Account is available")

		// hasing password
		const hashedPassword = await hash(dto.password)

		// trasn string to date type
		const dateOfBirth = DateUtils.stringToBirthday(dto.dateOfBirth)

		// create new record
		const newAccount = await this.prismaService.user.create({
			data: {
				email: dto.email,
				username: dto.username,
				firstName: dto.firstName,
				lastName: dto.lastName,
				hashedPassword: hashedPassword,
				...(dto.phoneNumber && { phoneNumber: dto.phoneNumber }),
				dateOfBirth
			}
		})

		// create code object
		const code = await this.generateVerificationCode()
		await this.prismaService.code.create({
			data: {
				code,
				userId: newAccount.id
			}
		})
		// emit event send verify
		await this.emailProducer.sendVerifyCodeRegister({ to: dto.email, code })

		return {
			status: true,
			data: newAccount
		}
	}

	// verify account
	async verifyAccount(dto: VerifyAccount) {
		// check available account
		const account = await this.prismaService.user.findUnique({
			where: { email: dto.email },
			select: {
				id: true,
				isActive: true,
				codes: true
			}
		})
		if (!account) throw new NotFoundException("Account not found")

		// get list codeuser
		const listcodeuser = account.codes.map(code => code.code)

		// check status account
		if (account.isActive) {
			throw new ConflictException("Account is already active")
		}

		// checking code
		const code = await this.prismaService.code.findUnique({
			where: { code_userId: { code: dto.code, userId: account.id } }
		})
		if (!code) throw new BadRequestException("Code is not existed or expried")

		// check valid code
		const isValied = listcodeuser.some(value => value === code.code)
		if (isValied) {
			await this.prismaService.$transaction([
				// change status account
				this.prismaService.user.update({
					where: { id: account.id },
					data: { isActive: true }
				}),
				// delete code verify
				this.prismaService.code.delete({
					where: { id: code.id }
				})
			])

			return {
				status: true
			}
		}

		return {
			status: false
		}

	}
}
