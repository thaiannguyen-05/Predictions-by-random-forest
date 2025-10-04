import { Body, Controller, Get, UseGuards, Patch, Post, Put, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { AuthService } from './service/auth.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { VerifyAccount } from './dto/verify-account.dto';
import { LoginDto } from './dto/login.dto';
import express from 'express'
import { Cookies } from 'src/common/decorator/cookie.decoratore';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtService: JwtService,
	) { }

	@Public()
	@Post('login')
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: express.Response) {
		return this.authService.login(dto, res);
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

	@Public()
	@Get('google')
	@UseGuards(AuthGuard('google'))
	async googleAuth() {
		// Passport sẽ tự redirect sang Google
	}

	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
		const userProfile = req.user as any;
		const { user, token } = await this.authService.socialLogin(req.user);
		res.redirect(`http://localhost:3000/auth/success?token=${token}`);
	}

	@Public()
	@Get('facebook')
	@UseGuards(AuthGuard('facebook'))
	async facebookAuth() { }


	@Get('facebook/callback')
	@UseGuards(AuthGuard('facebook'))
	async facebookAuthRedirect(@Req() req: Request, @Res() res: Response) {
		const userProfile = req.user as any;
		const { user, token } = await this.authService.socialLogin(req.user);
		res.redirect(`http://localhost:3000/auth/success?token=${token}`);
	}

}
