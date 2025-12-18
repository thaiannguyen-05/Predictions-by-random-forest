import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EmailProducer {
  constructor(@Inject('EMAIL_SERVICE') private readonly client: ClientProxy) {}

  sendVerifyCodeRegister(data: { to: string }) {
    this.client.emit('send-code-register', data);
  }

  sendDetectOtherDevice(data: { to: string; username: string }) {
    this.client.emit('send-detect-other-device', data);
  }

  sendNotifiCaitonChangePassword(data: { to: string; username: string }): void {
    this.client.emit('send-notification-password', data);
  }

  /**
   * Gửi email liên hệ đến admin qua queue
   */
  sendContactToAdmin(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): void {
    this.client.emit('send-contact-admin', data);
  }

  /**
   * Gửi email xác nhận cho người gửi form liên hệ qua queue
   */
  sendContactConfirmation(data: { to: string; userName: string }): void {
    this.client.emit('send-contact-confirmation', data);
  }
}
