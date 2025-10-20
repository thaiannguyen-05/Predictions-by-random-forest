import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMessageDto } from "../dto/create-message.dto";
import { MessageQueue } from "../interfaces/support-chat.interface";
import { MessageProducer } from "./queue_service/message.producer";

@Injectable()
export class MessageService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly messageProducer: MessageProducer
	) { }

	// get user with id
	async getUserById(userId: string) {
		return await this.prismaService.user.findUnique({
			where: { id: userId }
		})
	}

	// get room with id
	async getRoomWithId(roomId: string) {
		return await this.prismaService.room.findUnique({
			where: { id: roomId }
		})
	}

	// create message
	async createMessage(dto: CreateMessageDto) {
		// check available user
		const sender = await this.getUserById(dto.senderId)
		if (!sender) throw new NotFoundException("User not found")

		// check available room
		const room = await this.getRoomWithId(dto.roomId)
		if (!room) throw new NotFoundException("Room not found")

		// create message queue
		const messageQueue: MessageQueue = {
			content: dto.content,
			roomId: dto.roomId,
			senderId: dto.senderId,
			...(dto.receiverId && { receiverId: dto.receiverId }),
			...(dto.typeMessage && { typeMessage: dto.typeMessage }),
		}

		// emit event
		await this.messageProducer.sendingMessage({ message: messageQueue })

		return messageQueue
	}
}