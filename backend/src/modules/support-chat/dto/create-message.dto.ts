import { TypeMessage } from "../types/message.types"

export class CreateMessageDto {
	content: string
	typeMessage?: TypeMessage
	senderId: string
	roomId: string
	receiverId?: string
}