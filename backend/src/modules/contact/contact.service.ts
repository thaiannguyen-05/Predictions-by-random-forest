import { Injectable, Logger } from '@nestjs/common';
import { ContactFormDto } from './dto/contact-form.dto';
import { EmailService } from '../../email/email.service';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private readonly emailService: EmailService) {}

  async sendContactEmail(contactForm: ContactFormDto): Promise<boolean> {
    try {
      const { name, email, phone, subject, message } = contactForm;

      const adminEmailSent = await this.emailService.sendContactToAdmin({
        name,
        email,
        phone,
        subject,
        message,
      });

      if (adminEmailSent) {
        this.logger.log(`Contact email sent successfully from: ${email}`);

        await this.emailService.sendContactConfirmation(email, name);
      }

      return adminEmailSent;
    } catch (error) {
      this.logger.error('Failed to send contact email:', error);
      return false;
    }
  }
}
