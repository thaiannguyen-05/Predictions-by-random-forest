import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EmailProducer {
  private readonly logger = new Logger(EmailProducer.name);

  constructor(@Inject('EMAIL_SERVICE') private readonly client: ClientProxy) {}

  async sendVerifyCodeRegister(data: { to: string; code: string }) {
    this.logger.log(
      `📤 [Producer] Sending event 'send-code-register' → ${data.to}`,
    );
    await this.client.emit('send-code-register', data);
  }

  async sendDetectOtherDevice(data: { to: string; username: string }) {
    this.logger.log(
      `📤 [Producer] Sending event 'send-detect-other-device' → ${data.to}`,
    );
    await this.client.emit('send-detect-other-device', data);
  }

  async sendNotifiCaitonChangePassword(data: { to: string; username: string }) {
    this.logger.log(
      `📤 [Producer] Sending event 'send-notification-password' → ${data.to}`,
    );
    await this.client.emit('send-notification-password', data);
  }
}
