import { Body, Controller, Patch, Post, Put, Res } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { VerifyAccount } from './dto/verify-account.dto';
import { LoginDto } from './dto/login.dto';
import express from 'express'
import { Cookies } from 'src/common/decorator/cookie.decoratore';
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) { }

	@Post('register')
	async register(@Body() dto: CreateAccountDto) {
		return this.authService.register(dto)
	}

	@Put('verify')
	async verify(@Body() dto: VerifyAccount) {
		return this.authService.verifyAccount(dto)
	}

	@Post('login')
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: express.Response) {
		return this.authService.login(dto, res)
	}

	@Patch('logout')
	async logout(@Res({ passthrough: true }) res: express.Response, @Cookies('session_id') sessionId?: string) {
		return this.authService.logout(res, sessionId)
	}
}
