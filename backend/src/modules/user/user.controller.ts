import { Body, Controller, Put, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import express from 'express'
import { ChangeDetailDto } from "./dto/change-detail.dto";
@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService
	) { }

	@Put('change-detail-user')
	async changeDetailUser(@Req() req: express.Request, @Body() dto: ChangeDetailDto) {
		return this.userService.changeDetail(req, dto)
	}
}