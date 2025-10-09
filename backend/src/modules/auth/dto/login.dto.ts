import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
	@ApiProperty({
		description: 'Email address or username for login',
		example: 'user@example.com'
	})
	access: string

	@ApiProperty({
		description: 'User password',
		example: 'StrongPass123!',
		format: 'password'
	})
	password: string
}
