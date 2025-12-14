import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ContactFormDto } from './dto/contact-form.dto';

/**
 * Controller xử lý API liên hệ
 */
@ApiTags('Contact')
@Controller('contact')
export class ContactController {
	constructor(private readonly contactService: ContactService) { }

	/**
	 * Gửi form liên hệ
	 * POST /api/contact
	 */
	@Post()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Gửi form liên hệ' })
	@ApiResponse({ status: 200, description: 'Gửi thành công' })
	@ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
	@ApiResponse({ status: 500, description: 'Gửi email thất bại' })
	async submitContactForm(
		@Body() contactForm: ContactFormDto,
	): Promise<{ success: boolean; message: string }> {
		const result = await this.contactService.sendContactEmail(contactForm);

		if (result) {
			return {
				success: true,
				message: 'Tin nhắn của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi trong 24 giờ.',
			};
		}

		return {
			success: false,
			message: 'Gửi tin nhắn thất bại. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua email.',
		};
	}
}
