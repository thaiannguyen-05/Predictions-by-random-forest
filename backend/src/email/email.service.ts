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
      // get template
      const template = await this.getTemplate(`verificationRegister`);
      const subject = 'Verify email';
      const html = template
        ?.replace(' {CODE_VERIFY}', code)
        .replace('{USER_EMAIL}', toEmail);

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
        (Array.isArray(info.accepted)
          ? info.accepted.length > 0
          : info.messageId)
      );
    } catch (error) {
      this.logger.error('Send email failed:', error);
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
        (Array.isArray(info.accepted)
          ? info.accepted.length > 0
          : info.messageId)
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
        (Array.isArray(info.accepted)
          ? info.accepted.length > 0
          : info.messageId)
      );
    } catch (error) {
      this.logger.error('Send email failed:', error);
      return false;
    }
  }
}
