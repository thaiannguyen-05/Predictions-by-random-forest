import { Controller, Logger } from '@nestjs/common';
import { EmailService } from './email.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class EmailConsumer {
  private readonly logger = new Logger(EmailConsumer.name);

  constructor(private readonly emailService: EmailService) {}

  @EventPattern('send-code-register')
  async handleSendCodeRegister(@Payload() data: { to: string; code: string }) {
    this.logger.log(
      `📥 [Consumer] Received 'send-code-register' for ${data.to}`,
    );
    const result = await this.emailService.sendVerificationRegister(
      data.to,
      data.code,
    );
    this.logger.log(
      result
        ? `✅ [Consumer] Email sent successfully to ${data.to}`
        : `❌ [Consumer] Failed to send email to ${data.to}`,
    );
  }

  @EventPattern('send-detect-other-device')
  async handleSendDetectOtherDevice(
    @Payload() data: { to: string; username: string },
  ) {
    this.logger.log(
      `📥 [Consumer] Received 'send-detect-other-device' for ${data.to}`,
    );
    await this.emailService.detectdOtherDevice(data.to, data.username);
  }

  @EventPattern('send-notification-password')
  async handleSendNotificationChangePassword(
    @Payload() data: { to: string; username: string },
  ) {
    this.logger.log(
      `📥 [Consumer] Received 'send-notification-password' for ${data.to}`,
    );
    await this.emailService.changePassword(data.to, data.username);
  }
}
