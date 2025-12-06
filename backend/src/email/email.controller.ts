import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service";
import { Throttle } from "@nestjs/throttler";

@Controller('email')
export class EmailController {

	constructor(private readonly emailService: EmailService) {}

	@Throttle({ default: { ttl: 60000, limit: 3 } })
	@Post('send-verify-code')
	async sendVerifyCode(@Body() sendVerifyCodeDto: ) {

	}

}