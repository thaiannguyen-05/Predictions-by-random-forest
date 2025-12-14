import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * DTO cho form liên hệ từ frontend
 */
export class ContactFormDto {
	@IsNotEmpty({ message: 'Họ tên không được để trống' })
	@IsString()
	@MinLength(2, { message: 'Họ tên phải có ít nhất 2 ký tự' })
	@MaxLength(100, { message: 'Họ tên không được quá 100 ký tự' })
	name: string;

	@IsNotEmpty({ message: 'Email không được để trống' })
	@IsEmail({}, { message: 'Email không hợp lệ' })
	email: string;

	@IsOptional()
	@IsString()
	@MaxLength(15, { message: 'Số điện thoại không được quá 15 ký tự' })
	phone?: string;

	@IsNotEmpty({ message: 'Chủ đề không được để trống' })
	@IsString()
	@MaxLength(100, { message: 'Chủ đề không được quá 100 ký tự' })
	subject: string;

	@IsNotEmpty({ message: 'Nội dung không được để trống' })
	@IsString()
	@MinLength(10, { message: 'Nội dung phải có ít nhất 10 ký tự' })
	@MaxLength(2000, { message: 'Nội dung không được quá 2000 ký tự' })
	message: string;
}
