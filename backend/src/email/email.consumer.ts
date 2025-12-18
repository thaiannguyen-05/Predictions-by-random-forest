import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';
import { EventPattern, Payload } from '@nestjs/microservices';
@Controller()
export class EmailConsumer {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('send-code-register')
  async handleSendCodeRegister(@Payload() data: { to: string }) {
    await this.emailService.sendVerificationRegister(data.to);
  }

  @EventPattern('send-detect-other-device')
  async handleSendDetectOtherDevice(
    @Payload() data: { to: string; username: string },
  ) {
    return this.emailService.detectdOtherDevice(data.to, data.username);
  }

  @EventPattern('send-notification-password')
  async handleSendNotificationChangePassword(
    @Payload() data: { to: string; username: string },
  ): Promise<boolean> {
    return this.emailService.changePassword(data.to, data.username);
  }

  @EventPattern('send-contact-admin')
  async handleSendContactToAdmin(
    @Payload()
    data: {
      name: string;
      email: string;
      phone?: string;
      subject: string;
      message: string;
    },
  ): Promise<boolean> {
    return this.emailService.sendContactToAdmin(data);
  }

  @EventPattern('send-contact-confirmation')
  async handleSendContactConfirmation(
    @Payload() data: { to: string; userName: string },
  ): Promise<boolean> {
    return this.emailService.sendContactConfirmation(data.to, data.userName);
  }
}
