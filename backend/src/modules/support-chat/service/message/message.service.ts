import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMessageDto } from '../../dto/create-message.dto';
import { MessageQueue } from '../../interfaces/support-chat.interface';
import { MessageProducer } from './queue_service/message.producer';
import { UpdateMessageDto } from '../../dto/update-message.dto';
import { DeleteMessageDto } from '../../dto/delete-message.dto';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly messageProducer: MessageProducer,
  ) {}

  // get user with id
  async getUserById(userId: string) {
    return await this.prismaService.user.findUnique({
      where: { id: userId },
    });
  }

  // get room with id
  async getRoomWithId(roomId: string) {
    return await this.prismaService.room.findUnique({
      where: { id: roomId },
    });
  }

  async findMessageById(messageId: string) {
    return await this.prismaService.message.findUnique({
      where: { id: messageId },
    });
  }

  // is auhtor message
  private async isAuthorMessage(userId: string, messageId: string) {
    const message = await this.findMessageById(messageId);
    if (!message) throw new NotFoundException('Message not found');

    return message.senderId !== userId ? false : true;
  }

  // create message
  async createMessage(dto: CreateMessageDto) {
    // check available user
    const sender = await this.getUserById(dto.senderId);
    if (!sender) throw new NotFoundException('User not found');

    // check available room
    const room = await this.getRoomWithId(dto.roomId);
    if (!room) throw new NotFoundException('Room not found');

    // create message queue
    const messageQueue: MessageQueue = {
      content: dto.content,
      roomId: dto.roomId,
      senderId: dto.senderId,
      ...(dto.receiverId && { receiverId: dto.receiverId }),
      ...(dto.typeMessage && { typeMessage: dto.typeMessage }),
    };

    // emit event
    await this.messageProducer.sendingMessage({ message: messageQueue });

    return messageQueue;
  }

  // edit message
  async updateMessage(dto: UpdateMessageDto) {
    // check avialable user
    const user = await this.getUserById(dto.senderId);
    if (!user) throw new NotFoundException('User not found');

    // check is valid author message
    const isAuthorMessage = this.isAuthorMessage(user.id, dto.messageId);
    if (!isAuthorMessage)
      throw new UnauthorizedException('You are not author message');

    // update new content
    const newMessage = await this.prismaService.message.update({
      where: { senderId_id: { id: dto.messageId, senderId: user.id } },
      data: { content: dto.newContent },
    });

    return newMessage;
  }

  // delete message
  async deleteMessage(dto: DeleteMessageDto) {
    // check avialable user
    const user = await this.getUserById(dto.senderId);
    if (!user) throw new NotFoundException('User not found');

    // check is valid author message
    const isAuthorMessage = this.isAuthorMessage(user.id, dto.messageId);
    if (!isAuthorMessage)
      throw new UnauthorizedException('You are not author message');

    // remove
    return await this.prismaService.message.delete({
      where: { senderId_id: { id: dto.messageId, senderId: dto.senderId } },
    });
  }
}
