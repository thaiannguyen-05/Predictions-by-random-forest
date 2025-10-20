import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator'
import { TypeMessage } from "../types/message.types"

export class CreateMessageDto {
	@IsString()
	@IsNotEmpty()
	content: string

	@IsOptional()
	@IsEnum(TypeMessage)
	typeMessage?: TypeMessage

	@IsString()
	@IsNotEmpty()
	senderId: string

	@IsString()
	@IsNotEmpty()
	roomId: string

	@IsOptional()
	@IsString()
	receiverId?: string
}
