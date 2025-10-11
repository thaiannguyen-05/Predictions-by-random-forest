import { Body, Controller, Get, UseGuards, Patch, Post, Put, Req, Res, UnauthorizedException } from '@nestjs/common';
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
import { PassportStrategy } from '@nestjs/passport';


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

	@Public()
	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
		try {
			console.log('✅ Google callback user:', req.user);
			const userProfile = req.user as any;
			const { user, token } = await this.authService.socialLogin(userProfile);

			// ⚠ Nếu token là string => sửa logic ở đây
			res
				.cookie('access_token', token.accessToken ?? token, { httpOnly: true, sameSite: 'lax' })
				.cookie('refresh_token', token.refreshToken ?? '', { httpOnly: true, sameSite: 'lax' });

			res.redirect(`http://localhost:3000/auth/success?token=${token.accessToken}`);
		} catch (err) {
			console.error('❌ Google callback error:', err);
			res.status(500).json({ message: err.message, stack: err.stack });
		}
	}

	@Public()
	@Get('facebook')
	@UseGuards(AuthGuard('facebook'))
	async facebookAuth() { }


	@Public()
	@Get('facebook/callback')
	@UseGuards(AuthGuard('facebook'))
	async facebookAuthRedirect(@Req() req: Request, @Res() res: Response) {
		try {
			console.log('✅ Facebook callback reached');
			console.log('Full req.user:', req.user);
			console.log('req.user type:', typeof req.user);
			console.log('req.user keys:', req.user ? Object.keys(req.user) : 'No user');

			if (!req.user) {
				throw new Error('No user data from Facebook');
			}

			const profile = req.user as any;

			// DEBUG CHI TIẾT
			console.log('=== FACEBOOK CALLBACK - PROFILE ANALYSIS ===');
			console.log('Profile provider:', profile.provider);
			console.log('Profile firstName:', profile.firstName);
			console.log('Profile lastName:', profile.lastName);
			console.log('Profile displayName:', profile.displayName);
			console.log('Profile picture:', profile.picture);
			console.log('All profile keys:', Object.keys(profile));
			console.log('============================================');

			const { user, token } = await this.authService.socialLogin(profile);

			console.log('Social login result user:', user);

			// Set cookies
			res
				.cookie('access_token', token.accessToken, {
					httpOnly: true,
					sameSite: 'lax',
				})
				.cookie('refresh_token', token.refreshToken, {
					httpOnly: true,
					sameSite: 'lax',
				});

			// Redirect về frontend
			res.redirect(`http://localhost:3000/auth/success?token=${token.accessToken}`);

		} catch (err) {
			console.error('❌ Facebook callback error:', err);
			console.error('Error stack:', err.stack);

			// Redirect về trang lỗi
			res.redirect(`http://localhost:3000/auth/error?message=${encodeURIComponent(err.message)}`);
		}
	}

	@Get('me')
	async getMe(@Req() req: Request) {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) throw new UnauthorizedException('Token is required');

		const user = await this.authService.getMe(token);

		return {
			loggedIn: true,
			user: {
				id: user.id,
				email: user.email,
				username: user.username,
				name: user.name,
				avatar: user.avatar,
				provider: user.provider,
				isActive: user.isActive
			}
		};
	}
}