import { Body, Controller, Post } from "@nestjs/common";
import { MessageService } from "./message.service";
import { CreateMessageDto } from "../../dto/create-message.dto";
import { Public } from "src/common/decorator/public.decorator";

@Controller('test')
export class TestController {
	constructor(
		private readonly messageService: MessageService
	) { }


	@Public()
	@Post('create-message')
	async createMessage(@Body() data: CreateMessageDto) {
		return this.messageService.createMessage(data)
	}
}