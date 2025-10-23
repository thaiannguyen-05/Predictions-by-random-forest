import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { join } from 'path';
import { promises as fs } from 'fs';
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;
  private templateCache = new Map<string, string>();

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: configService.getOrThrow<string>('EMAIL_USER'),
        pass: configService.getOrThrow<string>('EMAIL_PASS'),
      },
    });

    // Verify transporter connection
    this.transporter.verify((error, success) => {
      if (error) {
        this.logger.error('Transporter verification failed:', error);
      } else {
        this.logger.log('Transporter is ready to send emails');
      }
    });
  }

  // get template
  async getTemplate(templateFileName: string) {
    if (this.templateCache.has(templateFileName)) {
      return this.templateCache.get(templateFileName);
    }
    try {
      const templatePath = join(
        __dirname,
        'templates',
        `${templateFileName}.html`,
      );
      const content = await fs.readFile(templatePath, 'utf-8');
      this.templateCache.set(templateFileName, content);
      return content;
    } catch (error) {
      this.logger.error(`Template not found ${templateFileName}`, error);
      throw new Error(`Template not found ${templateFileName}`);
    }
  }

  // send verification register
  async sendVerificationRegister(toEmail: string, code: string) {
    try {
      this.logger.log(
        `Attempting to send verification code ${code} to ${toEmail}`,
      );

      // Kiểm tra xem transporter có được khởi tạo không
      if (!this.transporter) {
        this.logger.error('Transporter not initialized');
        return false;
      }

      // Kiểm tra credentials
      const emailUser = this.configService.get<string>('EMAIL_USER');
      const emailPass = this.configService.get<string>('EMAIL_PASS');
      this.logger.log(`Using email: ${emailUser}`);
      this.logger.log(`Password length: ${emailPass?.length}`);

      const template = await this.getTemplate(`verificationRegister`);
      const subject = 'Verify email';
      const html = template
        ?.replace(' {CODE_VERIFY}', code)
        .replace('{USER_EMAIL}', toEmail);

      const mailOptions = {
        from: `Thaiandev Service: ${emailUser}`,
        subject,
        to: toEmail,
        html,
        // Thêm text version để debug
        text: `Your verification code is: ${code}`,
      };

      this.logger.log('Sending email with options:', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
      });

      // Send email
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log('Email sent successfully:', info.messageId);
      this.logger.log('Accepted:', info.accepted);
      this.logger.log('Rejected:', info.rejected);

      return !!(
        info &&
        (Array.isArray(info.accepted)
          ? info.accepted.length > 0
          : info.messageId)
      );
    } catch (error) {
      this.logger.error('Send email failed:', error);
      // Log chi tiết lỗi
      if (error instanceof Error) {
        this.logger.error(`Error message: ${error.message}`);
        this.logger.error(`Stack trace: ${error.stack}`);
      }
      return false;
    }
  }

  // send detect other device
  async detectdOtherDevice(toEmail: string, username: string) {
    try {
      // get template
      const template = await this.getTemplate('detectOtherDevice');
      const subject = 'Detectec other device';
      const html = template
        ?.replace('{TIME_DETECTED}', Date.now().toLocaleString())
        .replace('{USER_NAME}', username);

      const mailOptions = {
        from: `Thaiandev Service: ${this.configService.getOrThrow<string>('EMAIL_USER')}`,
        subject,
        to: toEmail,
        html,
      };

      // send email
      const info = await this.transporter.sendMail(mailOptions);
      return !!(
        info &&
        (Array.isArray((info as any).accepted)
          ? (info as any).accepted.length > 0
          : (info as any).messageId)
      );
    } catch (error) {
      this.logger.error('Send email failed:', error);
      return false;
    }
  }

  // send notify change password
  async changePassword(toEmail: string, username: string) {
    try {
      // get template
      const template = await this.getTemplate('notifyChangePassword');
      const subject = 'Notify Changepassword';
      const html = template
        ?.replace('{USER_NAME}', username)
        .replace('{BEHAVIOR_TIME}', new Date().toLocaleString());
      const mailOptions = {
        from: `Thaiandev Service: ${this.configService.getOrThrow<string>('EMAIL_USER')}`,
        subject,
        to: toEmail,
        html,
      };

      // send email
      const info = await this.transporter.sendMail(mailOptions);
      return !!(
        info &&
        (Array.isArray((info as any).accepted)
          ? (info as any).accepted.length > 0
          : (info as any).messageId)
      );
    } catch (error) {
      this.logger.error('Send email failed:', error);
      return false;
    }
  }
}
