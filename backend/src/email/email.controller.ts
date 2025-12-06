import { Body, Controller, Post } from '@nestjs/common';
import { EmailProducer } from './emai.producer';
import { VerifyAccount } from '../modules/auth/dto/verify-account.dto';
import { Public } from '../common/decorator/public.decorator';

@Controller('email')
export class EmailController {
  constructor(private readonly emailProducer: EmailProducer) {}

  @Public()
  @Post('send-verify-code-register')
  sendVerifyCodeRegister(@Body() dto: VerifyAccount) {
    return this.emailProducer.sendVerifyCodeRegister(dto);
  }
}
