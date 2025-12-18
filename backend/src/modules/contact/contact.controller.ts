import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ContactFormDto } from './dto/contact-form.dto';
import { User } from '../../common/decorator/user.decorator';

/**
 * Controller xử lý API liên hệ
 */
@ApiTags('Contact')
@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  /**
   * Gửi form liên hệ
   * POST /api/contact
   */
  @Post('sendContact')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Gửi form liên hệ' })
  @ApiResponse({ status: 200, description: 'Gửi thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  submitContactForm(
    @User('id') userId: string,
    @Body() contactForm: ContactFormDto,
  ): {
    success: boolean;
    message: string;
  } {
    // Đẩy email vào queue (fire and forget pattern)
    this.contactService.sendContactEmail(userId, contactForm);

    return {
      success: true,
      message:
        'Tin nhắn của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi trong 24 giờ.',
    };
  }
}
