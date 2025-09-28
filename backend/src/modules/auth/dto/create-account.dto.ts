import { IsEmail, IsString, IsOptional, IsDateString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateAccountDto {
	@IsEmail({}, { message: 'Please provide a valid email address' })
	email: string

	@IsString({ message: 'Username must be a string' })
	@MinLength(3, { message: 'Username must be at least 3 characters long' })
	@MaxLength(20, { message: 'Username must not exceed 20 characters' })
	username: string

	@IsString({ message: 'First name must be a string' })
	@MinLength(2, { message: 'First name must be at least 2 characters long' })
	@MaxLength(50, { message: 'First name must not exceed 50 characters' })
	firstName: string

	@IsString({ message: 'Last name must be a string' })
	@MinLength(2, { message: 'Last name must be at least 2 characters long' })
	@MaxLength(50, { message: 'Last name must not exceed 50 characters' })
	lastName: string

	@IsString({ message: 'Password must be a string' })
	@MinLength(8, { message: 'Password must be at least 8 characters long' })
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
		message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
	})
	password: string

	@IsOptional()
	@IsString({ message: 'Phone number must be a string' })
	@Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Please provide a valid phone number' })
	phoneNumber?: string

	@IsDateString({}, { message: 'Date of birth must be a valid date string (YYYY-MM-DD)' })
	dateOfBirth: string
}