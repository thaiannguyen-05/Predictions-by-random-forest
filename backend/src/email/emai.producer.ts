import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EmailProducer {
  constructor(@Inject('EMAIL_SERVICE') private readonly client: ClientProxy) {}

  async sendVerifyCodeRegister(data: {
    to: string;
    code: string;
    username?: string;
  }) {
    console.log('🔍 Checking RabbitMQ connection...');

    // Kiểm tra kết nối
    await this.client.connect();
    console.log('✅ Connected to RabbitMQ');

    console.log('📤 Emitting event to send-code-register');
    await this.client.emit('send-code-register', {
      to: data.to,
      code: data.code,
      username: data.username,
      subject: 'Xác thực tài khoản - StockTrack',
      template: 'verify-email',
    });

    console.log('✅ Event emitted');
  }

  async sendDetectOtherDevice(data: { to: string; username: string }) {
    await this.client.emit('send-detect-other-device', {
      to: data.to,
      username: data.username,
      subject: 'Cảnh báo đăng nhập - StockTrack',
      template: 'detect-device',
    });
  }

  async sendNotifiCaitonChangePassword(data: { to: string; username: string }) {
    await this.client.emit('send-notification-password', {
      to: data.to,
      username: data.username,
      subject: 'Thay đổi mật khẩu - StockTrack',
      template: 'change-password',
    });
  }
}
