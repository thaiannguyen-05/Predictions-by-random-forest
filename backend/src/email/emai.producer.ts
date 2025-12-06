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

  sendNotifiCaitonChangePassword(data: { to: string; username: string }) {
    this.client.emit('send-notification-password', data);
  }
}
