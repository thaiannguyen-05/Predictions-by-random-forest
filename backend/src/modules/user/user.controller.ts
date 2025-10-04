import { Controller, Post, Body, Put, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import express from 'express'
import { ChangeDetailDto } from "./dto/change-detail.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import type { CreateUserDto } from "./dto/create-user.dto";

@Controller('auth')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Post('register')
	async register(@Body() dto: CreateUserDto) {
		return this.userService.register(dto);
	}

	@Post('login')
	async login(@Body() dto: LoginUserDto) {
		return this.userService.login(dto);
	}
}