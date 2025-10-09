import { Controller, Post, Body, Put, Req } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from "./user.service";
import express from 'express'
import { ChangeDetailDto } from "./dto/change-detail.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import type { CreateUserDto } from "./dto/create-user.dto";

@ApiTags('auth')
@Controller('auth')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Post('register')
	@ApiOperation({
		summary: 'Register a new user',
		description: 'Create a new user account with email and password'
	})
	@ApiBody({ type: CreateUserDto, description: 'User registration data' })
	@ApiResponse({
		status: 201,
		description: 'User registered successfully',
		schema: {
			type: 'object',
			properties: {
				message: { type: 'string', example: 'User registered successfully' },
				user: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						email: { type: 'string' },
						createdAt: { type: 'string', format: 'date-time' }
					}
				}
			}
		}
	})
	@ApiResponse({
		status: 400,
		description: 'Bad request - validation error or user already exists'
	})
	async register(@Body() dto: CreateUserDto) {
		return this.userService.register(dto);
	}

	@Post('login')
	@ApiOperation({
		summary: 'User login',
		description: 'Authenticate user with email and password'
	})
	@ApiBody({ type: LoginUserDto, description: 'User login credentials' })
	@ApiResponse({
		status: 200,
		description: 'Login successful',
		schema: {
			type: 'object',
			properties: {
				message: { type: 'string', example: 'Login successful' },
				token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
				user: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						email: { type: 'string' }
					}
				}
			}
		}
	})
	@ApiResponse({
		status: 401,
		description: 'Unauthorized - invalid credentials'
	})
	async login(@Body() dto: LoginUserDto) {
		return this.userService.login(dto);
	}
}
