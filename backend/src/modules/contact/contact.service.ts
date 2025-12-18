import { Injectable, Logger } from '@nestjs/common';
import { ContactFormDto } from './dto/contact-form.dto';
import { EmailProducer } from '../../email/emai.producer';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Service xử lý gửi email liên hệ
 * Sử dụng EmailProducer để đẩy email vào queue (tuân thủ pattern Producer → Queue → Consumer)
 */
@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly emailProducer: EmailProducer,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   * Gửi email liên hệ từ form đến admin qua queue
   * @param contactForm - Dữ liệu từ form liên hệ
   */
  async sendContactEmail(
    userId: string,
    contactForm: ContactFormDto,
  ): Promise<void> {
    // check available user
    const availableUser = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!availableUser) {
      throw new Error('User not found');
    }

    const { name, email, phone, subject, message } = contactForm;

    // Gửi email thông báo đến admin (dev) qua queue
    // Email sẽ được gửi về ADMIN_EMAIL với nội dung chứa thông tin liên hệ của user
    this.emailProducer.sendContactToAdmin({
      name,
      email,
      phone,
      subject,
      message,
    });

    this.logger.log(`Contact email queued to admin from user: ${email}`);
  }
}
