import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class EmailConsumer {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('send-code-register')
  async handleSendCodeRegister(@Payload() data: { to: string; code: string }) {
    console.log('🎯 EMAIL CONSUMER: Received send-code-register event');
    console.log('📧 Email:', data.to);
    console.log('🔢 Code:', data.code);

    try {
      const result = await this.emailService.sendVerificationRegister(
        data.to,
        data.code,
      );
      console.log('✅ Email service result:', result);
    } catch (error) {
      console.error('❌ Email service error:', error);
    }
  }

  @EventPattern('send-detect-other-device')
  async handleSendDetectOtherDevice(
    @Payload() data: { to: string; username: string },
  ) {
    console.log('🎯 EMAIL CONSUMER: Received detect-other-device event');
    return this.emailService.detectdOtherDevice(data.to, data.username);
  }

  @EventPattern('send-notification-password')
  async handleSendNotificationChangePassword(
    @Payload() data: { to: string; username: string },
  ) {
    console.log('🎯 EMAIL CONSUMER: Received change-password event');
    return this.emailService.changePassword(data.to, data.username);
  }
}
