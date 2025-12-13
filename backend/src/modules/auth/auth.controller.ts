import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import express from 'express';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyAccount } from './dto/verify-account.dto';
import { AuthService } from './service/auth.service';
import { FacebookOAuth2User, GoogleOAuth2User } from './auth.interface';
import { Public } from '../../common/decorator/public.decorator';
import { Cookies } from '../../common/decorator/cookie.decoratore';
import { AUTH_CONSTANT } from './auth.constants';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticate user with email and password, returns JWT tokens in cookies',
  })
  @ApiBody({ type: LoginDto, description: 'Login credentials' })
  @ApiResponse({
    status: 200,
    description: 'Login successful, JWT tokens set in cookies',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Login successful' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            verified: { type: 'boolean' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid credentials',
  })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    return this.authService.login(dto, res);
  }

  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Register new account',
    description: 'Create a new user account and send verification email',
  })
  @ApiBody({ type: CreateAccountDto, description: 'Account registration data' })
  @ApiResponse({
    status: 201,
    description: 'Account created successfully, verification email sent',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Account created successfully' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            verified: { type: 'boolean', example: false },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error or user already exists',
  })
  async register(@Body() dto: CreateAccountDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Put('verify')
  @ApiOperation({
    summary: 'Verify account',
    description: 'Verify user account with verification code sent via email',
  })
  @ApiBody({ type: VerifyAccount, description: 'Account verification data' })
  @ApiResponse({
    status: 200,
    description: 'Account verified successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid verification code or account already verified',
  })
  async verify(@Body() dto: VerifyAccount) {
    return this.authService.verifyAccount(dto);
  }

  @Patch('logout')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'User logout',
    description: 'Logout user and clear authentication cookies',
  })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
  })
  async logout(
    @Res({ passthrough: true }) res: express.Response,
    @Cookies('session_id') sessionId?: string,
  ) {
    return this.authService.logout(res, sessionId);
  }

  @Patch('change-password')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Change password',
    description: 'Change user password (requires authentication)',
  })
  @ApiBody({ type: ChangePasswordDto, description: 'Password change data' })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid current password or validation error',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing token',
  })
  async changePassword(
    @Req() req: express.Request,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(req, dto);
  }

  @Patch('refresh-token')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Refresh JWT token',
    description: 'Refresh access token using refresh token from cookies',
  })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid or expired refresh token',
  })
  async refreshToken(
    @Cookies('session_id') sessionId: string,
    @Cookies('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    return this.authService.refreshToken(sessionId, refreshToken, res);
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Google OAuth login',
    description: 'Initiate Google OAuth authentication flow',
  })
  @ApiExcludeEndpoint()
  async googleAuth() {}

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Google OAuth callback',
    description: 'Handle Google OAuth callback and create user session',
  })
  @ApiExcludeEndpoint()
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Ép kiểu đúng cách: trung gian qua unknown để tránh cảnh báo TS
    const result = await this.authService.oauth2Login(
      req.user as unknown as GoogleOAuth2User,
      res,
    );

    // Lấy token từ trường tokens
    const accessToken = result.tokens.accessToken;
    // Redirect về FE với token
    return res.redirect(AUTH_CONSTANT.REDIRECT_LINK(accessToken));
    // return this.authService.oauth2Login(req.user as any as GoogleOAuth2User, res)
  }

  @Public()
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({
    summary: 'Facebook OAuth login',
    description: 'Initiate Facebook OAuth authentication flow',
  })
  @ApiExcludeEndpoint()
  async facebookAuth() {}

  @Public()
  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({
    summary: 'Facebook OAuth callback',
    description: 'Handle Facebook OAuth callback and create user session',
  })
  @ApiExcludeEndpoint()
  async facebookAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.oauth2Login(
      req.user as unknown as FacebookOAuth2User,
      res,
    );

    // Lấy token từ trường tokens và redirect về FE
    const accessToken = result.tokens.accessToken;
    return res.redirect(AUTH_CONSTANT.REDIRECT_LINK(accessToken));
  }

  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Get the authenticated user profile information',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        loggedIn: { type: 'boolean', example: true },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            verified: { type: 'boolean' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - token required or invalid',
  })
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
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phone,
        avatar: user.avatar,
        provider: user.provider,
        isActive: user?.isActive,
      },
    };
  }
}
