import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ContactFormDto } from './dto/contact-form.dto';

/**
 * Service xử lý gửi email liên hệ
 */
@Injectable()
export class ContactService {
	private readonly logger = new Logger(ContactService.name);
	private transporter: nodemailer.Transporter;
	private readonly adminEmail: string;

	constructor(private readonly configService: ConfigService) {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: configService.getOrThrow<string>('EMAIL_USER'),
				pass: configService.getOrThrow<string>('EMAIL_PASS'),
			},
		});

		// Email admin nhận thông báo liên hệ
		this.adminEmail = 'thaianthedev@gmail.com';
	}

	/**
	 * Gửi email liên hệ từ form đến admin
	 * @param contactForm - Dữ liệu từ form liên hệ
	 * @returns true nếu gửi thành công
	 */
	async sendContactEmail(contactForm: ContactFormDto): Promise<boolean> {
		try {
			const { name, email, phone, subject, message } = contactForm;

			const htmlContent = this.buildContactEmailHtml({
				name,
				email,
				phone,
				subject,
				message,
				timestamp: new Date().toLocaleString('vi-VN', {
					timeZone: 'Asia/Ho_Chi_Minh',
				}),
			});

			const mailOptions = {
				from: `StockDN Contact Form <${this.configService.getOrThrow<string>('EMAIL_USER')}>`,
				to: this.adminEmail,
				subject: `[Liên Hệ StockDN] ${subject} - ${name}`,
				html: htmlContent,
				replyTo: email,
			};

			const info = await this.transporter.sendMail(mailOptions);
			const success = !!(
				info &&
				(Array.isArray(info.accepted)
					? info.accepted.length > 0
					: info.messageId)
			);

			if (success) {
				this.logger.log(`Contact email sent successfully from: ${email}`);
				// Gửi email xác nhận cho người gửi
				await this.sendConfirmationEmail(email, name);
			}

			return success;
		} catch (error) {
			this.logger.error('Failed to send contact email:', error);
			return false;
		}
	}

	/**
	 * Gửi email xác nhận cho người dùng đã gửi form liên hệ
	 */
	private async sendConfirmationEmail(
		toEmail: string,
		userName: string,
	): Promise<void> {
		try {
			const htmlContent = this.buildConfirmationEmailHtml(userName);

			const mailOptions = {
				from: `StockDN <${this.configService.getOrThrow<string>('EMAIL_USER')}>`,
				to: toEmail,
				subject: '[StockDN] Cảm ơn bạn đã liên hệ!',
				html: htmlContent,
			};

			await this.transporter.sendMail(mailOptions);
			this.logger.log(`Confirmation email sent to: ${toEmail}`);
		} catch (error) {
			this.logger.warn('Failed to send confirmation email:', error);
		}
	}

	/**
	 * Tạo HTML template cho email liên hệ gửi đến admin
	 */
	private buildContactEmailHtml(data: {
		name: string;
		email: string;
		phone?: string;
		subject: string;
		message: string;
		timestamp: string;
	}): string {
		return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Liên Hệ Mới từ StockDN</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #121212;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #121212; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1E1E1E; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #F97316 0%, #EA580C 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">📬 Liên Hệ Mới từ StockDN</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <!-- Info Cards -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background-color: rgba(249, 115, 22, 0.1); border-radius: 12px; padding: 20px; border-left: 4px solid #F97316;">
                    <p style="color: #9CA3AF; margin: 0 0 5px 0; font-size: 12px; text-transform: uppercase;">Người Gửi</p>
                    <p style="color: #F3F4F6; margin: 0; font-size: 18px; font-weight: bold;">${data.name}</p>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td width="48%" style="background-color: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px;">
                    <p style="color: #9CA3AF; margin: 0 0 5px 0; font-size: 12px;">📧 Email</p>
                    <p style="color: #F97316; margin: 0; font-size: 14px;"><a href="mailto:${data.email}" style="color: #F97316; text-decoration: none;">${data.email}</a></p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background-color: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px;">
                    <p style="color: #9CA3AF; margin: 0 0 5px 0; font-size: 12px;">📱 Điện Thoại</p>
                    <p style="color: #F3F4F6; margin: 0; font-size: 14px;">${data.phone || 'Không cung cấp'}</p>
                  </td>
                </tr>
              </table>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background-color: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px;">
                    <p style="color: #9CA3AF; margin: 0 0 5px 0; font-size: 12px;">📋 Chủ Đề</p>
                    <p style="color: #F3F4F6; margin: 0; font-size: 16px; font-weight: 600;">${data.subject}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background-color: rgba(255,255,255,0.03); border-radius: 12px; padding: 20px; border: 1px solid rgba(255,255,255,0.1);">
                    <p style="color: #9CA3AF; margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase;">💬 Nội Dung Tin Nhắn</p>
                    <p style="color: #F3F4F6; margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Timestamp -->
              <p style="color: #6B7280; font-size: 12px; text-align: center; margin: 0;">
                ⏰ Thời gian gửi: ${data.timestamp}
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: rgba(255,255,255,0.02); padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: #6B7280; font-size: 12px; margin: 0;">
                Email này được gửi tự động từ form liên hệ trên StockDN
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
	}

	/**
	 * Tạo HTML template cho email xác nhận gửi đến người dùng
	 */
	private buildConfirmationEmailHtml(userName: string): string {
		return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cảm ơn bạn đã liên hệ - StockDN</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #121212;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #121212; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1E1E1E; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #F97316 0%, #EA580C 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">✅ Đã Nhận Tin Nhắn!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="color: #F3F4F6; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
                Xin chào <strong style="color: #F97316;">${userName}</strong>,
              </p>
              
              <p style="color: #9CA3AF; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;">
                Cảm ơn bạn đã liên hệ với StockDN! Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong vòng <strong style="color: #F97316;">24 giờ</strong> làm việc.
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td style="background-color: rgba(249, 115, 22, 0.1); border-radius: 12px; padding: 20px; text-align: center;">
                    <p style="color: #F97316; font-size: 14px; margin: 0;">
                      📞 Hotline: <strong>0337 700 159</strong><br>
                      📧 Email: <strong>thaianthedev@gmail.com</strong>
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="color: #9CA3AF; font-size: 14px; line-height: 1.7; margin: 0;">
                Trân trọng,<br>
                <strong style="color: #F3F4F6;">Đội ngũ StockDN</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: rgba(255,255,255,0.02); padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: #6B7280; font-size: 12px; margin: 0;">
                © 2025 StockDN. Nền tảng phân tích chứng khoán AI hàng đầu Việt Nam.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
	}
}
