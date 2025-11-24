import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from '../../dto/create-room.dto';
import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  // create room
  async createRoom(dto: CreateRoomDto) {
    // check available room
    let room = await this.prismaService.room.findUnique({
      where: { id: dto.sessionId },
    });

    if (room) {
      console.log(`Room is available`);
      return room;
    }

    // create new room
    room = await this.prismaService.room.create({
      data: {
        id: dto.sessionId,
        ...(dto.employeeId && { employeeId: dto.employeeId }),
        customerId: dto.customerId,
      },
    });

    return room;
  }
}
