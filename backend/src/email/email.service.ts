import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { join } from 'path';
import { promises as fs } from 'fs';
import { RedisService } from '../modules/redis/redis.service';
import { AUTH_CONSTANT } from '../modules/auth/auth.constants';

/**
 * Interface cho dữ liệu email liên hệ
 */
interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

@Injectable()
export class EmailService {
  private readonly ADMIN_EMAIL = 'thaianthedev@gmail.com';
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;
  private templateCache = new Map<string, string>();

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
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
  async sendVerificationRegister(toEmail: string) {
    try {
      // get template
      const template = await this.getTemplate(`verificationRegister`);
      const subject = 'Verify email';

      // generate tokens and saving in redis
      const key = AUTH_CONSTANT.KEY_VERIFY_CODE(toEmail);

      // check key is exist
      const existKey = await this.redisService.get(key);
      if (existKey) {
        this.logger.debug(`${key} have value: ${existKey} has been saved `);
        await this.redisService.del(key);
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      await this.redisService.set(key, code);
      this.logger.debug(`${key} have value: ${code} has been saved `);

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

  /**
   * Gửi email liên hệ đến admin
   * @param contactData - Dữ liệu form liên hệ
   * @returns true nếu gửi thành công
   */
  async sendContactToAdmin(contactData: ContactEmailData): Promise<boolean> {
    try {
      const template = await this.getTemplate('contactAdmin');
      const timestamp = new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
      });

      const html = template
        ?.replace(/{SENDER_NAME}/g, contactData.name)
        .replace(/{SENDER_EMAIL}/g, contactData.email)
        .replace(/{SENDER_PHONE}/g, contactData.phone || 'Không cung cấp')
        .replace(/{CONTACT_SUBJECT}/g, contactData.subject)
        .replace(/{CONTACT_MESSAGE}/g, contactData.message)
        .replace(/{SENT_TIME}/g, timestamp);

      const mailOptions = {
        from: `StockDN Contact Form <${this.configService.getOrThrow<string>('EMAIL_USER')}>`,
        to: this.ADMIN_EMAIL,
        subject: `[Liên Hệ StockDN] ${contactData.subject} - ${contactData.name}`,
        html,
        replyTo: contactData.email,
      };

      const info = await this.transporter.sendMail(mailOptions);
      const success = !!(
        info &&
        (Array.isArray(info.accepted)
          ? info.accepted.length > 0
          : info.messageId)
      );

      if (success) {
        this.logger.log(
          `Contact email sent to admin from: ${contactData.email}`,
        );
      }

      return success;
    } catch (error) {
      this.logger.error('Failed to send contact email to admin:', error);
      return false;
    }
  }

  /**
   * Gửi email xác nhận cho người dùng sau khi submit form liên hệ
   * @param toEmail - Email người dùng
   * @param userName - Tên người dùng
   * @returns true nếu gửi thành công
   */
  async sendContactConfirmation(
    toEmail: string,
    userName: string,
  ): Promise<boolean> {
    try {
      const template = await this.getTemplate('contactConfirmation');
      const html = template?.replace(/{USER_NAME}/g, userName);

      const mailOptions = {
        from: `StockDN <${this.configService.getOrThrow<string>('EMAIL_USER')}>`,
        to: toEmail,
        subject: '[StockDN] Cảm ơn bạn đã liên hệ!',
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      const success = !!(
        info &&
        (Array.isArray(info.accepted)
          ? info.accepted.length > 0
          : info.messageId)
      );

      if (success) {
        this.logger.log(`Confirmation email sent to: ${toEmail}`);
      }

      return success;
    } catch (error) {
      this.logger.error('Failed to send confirmation email:', error);
      return false;
    }
  }
}
