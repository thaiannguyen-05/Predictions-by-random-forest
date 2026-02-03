import { Injectable } from '@nestjs/common';
import { ChangeDetailDto } from './dto/change-detail.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DateUtils } from '../../common/utils/string-to-date.utils';
import { UserNotFoundOrNotActiveException } from './exceptions/user.exception';
import { MyLogger } from '../../logger/logger.service';
import type { UserResponse } from '.';

const CONTEXT = 'UserService';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: MyLogger,
  ) {}

  public async findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
      omit: { hashedPassword: false },
    });
  }

  public async findUserById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      omit: { hashedPassword: false },
    });
  }

  private async getActiveAccount(
    userId: string,
  ): Promise<import('../../../prisma/generated/prisma').User | null> {
    return await this.prismaService.user.findFirst({
      where: {
        AND: [{ id: userId }, { isActive: true }],
      },
      omit: { hashedPassword: false },
    });
  }

  async changeDetail(
    userId: string,
    dto: ChangeDetailDto,
  ): Promise<UserResponse> {
    this.logger.log(`Changing user details for userId: ${userId}`, CONTEXT);

    if (!userId) {
      this.logger.warn('User ID not found in request', CONTEXT);
      throw new UserNotFoundOrNotActiveException();
    }

    const user = await this.getActiveAccount(userId);

    if (!user) {
      this.logger.warn(`User not found or not active: ${userId}`, CONTEXT);
      throw new UserNotFoundOrNotActiveException(userId, {
        action: 'changeDetail',
      });
    }

    const dateOfBirth = dto.dateOfBirth
      ? DateUtils.stringToBirthday(dto.dateOfBirth)
      : undefined;

    let fullname: string | undefined = undefined;
    if (dto.firstName || dto.lastName) {
      const newFirstName =
        dto.firstName !== undefined ? dto.firstName : user.firstName;
      const newLastName =
        dto.lastName !== undefined ? dto.lastName : user.lastName;
      fullname = `${newFirstName || ''} ${newLastName || ''}`.trim();
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        ...(dto.username && { username: dto.username }),
        ...(dto.firstName && { firstName: dto.firstName }),
        ...(dto.lastName && { lastName: dto.lastName }),
        ...(dto.phoneNumber && { phone: dto.phoneNumber }),
        ...(dto.dateOfBirth && { dateOfBirth }),
        ...(dto.avtUrl && { avtUrl: dto.avtUrl }),
        ...(fullname && { fullname }),
      },
    });

    const { hashedPassword: _, ...userWithoutPassword } = updatedUser;
    this.logger.debug(`User details updated successfully: ${userId}`, CONTEXT);

    return {
      status: true,
      data: userWithoutPassword,
    };
  }

  async me(userId: string): Promise<UserResponse> {
    this.logger.debug(`Getting profile for userId: ${userId}`, CONTEXT);

    if (!userId) {
      this.logger.warn('User ID not found in request for getMe', CONTEXT);
      throw new UserNotFoundOrNotActiveException();
    }

    const availableUser = await this.getActiveAccount(userId);

    if (!availableUser) {
      this.logger.warn(`User not found for getMe: ${userId}`, CONTEXT);
      throw new UserNotFoundOrNotActiveException(userId, {
        action: 'getMe',
      });
    }

    const { hashedPassword: _, ...userWithoutPassword } = availableUser;

    return {
      status: true,
      data: userWithoutPassword,
    };
  }
}
