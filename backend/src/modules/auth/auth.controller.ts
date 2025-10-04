import { Body, Controller, Patch, Post, Put, Req, Res } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { VerifyAccount } from './dto/verify-account.dto';
import { LoginDto } from './dto/login.dto';
import express from 'express'
import { Cookies } from 'src/common/decorator/cookie.decoratore';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Public } from 'src/common/decorator/public.decorator';
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) { }

	@Public()
	@Post('login')
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: express.Response) {
		return this.authService.login(dto, res)
	}

	@Public()
	@Post('register')
	async register(@Body() dto: CreateAccountDto) {
		return this.authService.register(dto)
	}

	@Public()
	@Put('verify')
	async verify(@Body() dto: VerifyAccount) {
		return this.authService.verifyAccount(dto)
	}

	@Patch('logout')
	async logout(@Res({ passthrough: true }) res: express.Response, @Cookies('session_id') sessionId?: string) {
		return this.authService.logout(res, sessionId)
	}

	@Patch('change-password')
	async changePassword(@Req() req: express.Request, @Body() dto: ChangePasswordDto) {
		return this.authService.changePassword(req, dto)
	}

	@Patch('refresh-token')
	async refreshToken(@Cookies('session_id') sessionId: string, @Cookies('refresh_token') refreshToken: string, @Res({ passthrough: true }) res: express.Response) {
		return this.authService.refreshToken(sessionId, refreshToken, res)
	}
}
