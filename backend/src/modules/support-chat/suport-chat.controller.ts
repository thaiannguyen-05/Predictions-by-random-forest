import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SupportChatService } from './support-chat.service';
import { ResponseMessageDto } from './dto/response-message.dto';
import { Public } from '../../common/decorator/public.decorator';
@Public()
@Controller('chat')
export class SupportChatController {
  constructor(private readonly supportChatService: SupportChatService) {}

  @Post('call-chat')
  async generateResponse(@Body() data: ResponseMessageDto) {
    return this.supportChatService.generateResponse(data);
  }

  @Get('init-chat')
  async initChat(@Query('userId') userId: string) {
    return this.supportChatService.initialMessage(userId);
  }
}
