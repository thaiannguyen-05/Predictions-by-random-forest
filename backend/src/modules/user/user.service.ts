import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { ChangeDetailDto } from './dto/change-detail.dto';
import { User } from '../../../prisma/generated/prisma';
import { PrismaService } from '../../prisma/prisma.service';
import { DateUtils } from '../../common/utils/string-to-date.utils';
@Injectable()
export class UserService {
  private users: User[] = [];
  constructor(private readonly prismaService: PrismaService) {}

  // check available user and active user
  private async getActiveAccount(userId: string) {
    return await this.prismaService.user.findFirst({
      where: {
        AND: [
          {
            id: userId,
          },
          {
            isActive: true,
          },
        ],
      },
      omit: { hashedPassword: false },
    });
  }

  // change detail
  async changeDetail(req: Request, dto: ChangeDetailDto) {
    // get userid
    const userId = (req.user as any)?.id || 'unknown';
    // validate user
    const user = await this.getActiveAccount(userId);
    if (!user) throw new NotFoundException('User not found or not active');

    // trans date time
    const dateOfBirth = dto.dateOfBirth
      ? DateUtils.stringToBirthday(dto.dateOfBirth)
      : undefined;

    // Construct fullname if firstName or lastName is updated
    let fullname: string | undefined = undefined;
    if (dto.firstName || dto.lastName) {
      const isFirstName =
        dto.firstName !== undefined ? dto.firstName : user.firstName;
      const isLastName =
        dto.lastName !== undefined ? dto.lastName : user.lastName;
      fullname = `${isFirstName || ''} ${isLastName || ''}`.trim();
    }

    // update data
    const newUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        ...(dto.username && { username: dto.username }),
        ...(dto.firstName && { firstName: dto.firstName }),
        ...(dto.lastName && { lastName: dto.lastName }),
        ...(dto.phoneNumber && { phone: dto.phoneNumber }),
        ...(dto.dateOfBirth && { dateOfBirth: dateOfBirth }),
        ...(dto.avtUrl && { avtUrl: dto.avtUrl }),
        ...(fullname && { fullname }),
      },
    });

    // Remove hashedPassword before returning
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword, ...userWithoutPassword } = newUser;
    return {
      status: true,
      data: userWithoutPassword,
    };
  }
}
