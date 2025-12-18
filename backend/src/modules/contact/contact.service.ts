import { Injectable, Logger } from '@nestjs/common';
import { ContactFormDto } from './dto/contact-form.dto';
import { EmailService } from '../../email/email.service';

/**
 * Service xử lý gửi email liên hệ
 * Sử dụng EmailService để xử lý việc gửi email
 */
@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private readonly emailService: EmailService) { }

  /**
   * Gửi email liên hệ từ form đến admin
   * @param contactForm - Dữ liệu từ form liên hệ
   * @returns true nếu gửi thành công
   */
  async sendContactEmail(contactForm: ContactFormDto): Promise<boolean> {
    try {
      const { name, email, phone, subject, message } = contactForm;

      // Gửi email thông báo đến admin
      const adminEmailSent = await this.emailService.sendContactToAdmin({
        name,
        email,
        phone,
        subject,
        message,
      });

      if (adminEmailSent) {
        this.logger.log(`Contact email sent successfully from: ${email}`);

        // Gửi email xác nhận cho người gửi
        await this.emailService.sendContactConfirmation(email, name);
      }

      return adminEmailSent;
    } catch (error) {
      this.logger.error('Failed to send contact email:', error);
      return false;
    }
  }
}
