import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { EmailModule } from '../../email/email.module';

/**
 * Module xử lý liên hệ/contact form
 * Import EmailModule để sử dụng EmailService
 */
@Module({
  imports: [EmailModule],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule { }
