import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ChangeDetailDto } from './dto/change-detail.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DateUtils } from '../../common/utils/string-to-date.utils';
import { UserNotFoundOrNotActiveException } from './exceptions/user.exception';

/**
 * Response interface cho user data
 */
export interface UserResponse {
  status: boolean;
  data: Omit<import('../../../prisma/generated/prisma').User, 'hashedPassword'>;
}

/**
 * Service xử lý các nghiệp vụ liên quan đến User
 * @class UserService
 */
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Lấy thông tin user active từ database
   * @param userId - ID của user cần kiểm tra
   * @returns User nếu tồn tại và active, null nếu không
   */
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

  /**
   * Cập nhật thông tin chi tiết của user
   * @param req - Request object chứa thông tin user đang đăng nhập
   * @param dto - DTO chứa các thông tin cần cập nhật
   * @returns User data sau khi cập nhật (không bao gồm password)
   * @throws UserNotFoundOrNotActiveException nếu user không tồn tại hoặc không active
   */
  async changeDetail(
    req: Request,
    dto: ChangeDetailDto,
  ): Promise<UserResponse> {
    const userId = req.user?.id;

    if (!userId) {
      throw new UserNotFoundOrNotActiveException();
    }

    const user = await this.getActiveAccount(userId);

    if (!user) {
      throw new UserNotFoundOrNotActiveException(userId, {
        action: 'changeDetail',
      });
    }

    // Transform date string to Date object
    const dateOfBirth = dto.dateOfBirth
      ? DateUtils.stringToBirthday(dto.dateOfBirth)
      : undefined;

    // Construct fullname if firstName or lastName is updated
    let fullname: string | undefined = undefined;
    if (dto.firstName || dto.lastName) {
      const newFirstName =
        dto.firstName !== undefined ? dto.firstName : user.firstName;
      const newLastName =
        dto.lastName !== undefined ? dto.lastName : user.lastName;
      fullname = `${newFirstName || ''} ${newLastName || ''}`.trim();
    }

    // Update user data
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

    // Remove hashedPassword before returning
    const { hashedPassword: _, ...userWithoutPassword } = updatedUser;

    return {
      status: true,
      data: userWithoutPassword,
    };
  }

  /**
   * Lấy thông tin profile của user hiện tại
   * @param req - Request object chứa thông tin user đang đăng nhập
   * @returns User data (không bao gồm password)
   * @throws UserNotFoundOrNotActiveException nếu user không tồn tại hoặc không active
   */
  async me(req: Request): Promise<UserResponse> {
    const userId = req.user?.id;

    if (!userId) {
      throw new UserNotFoundOrNotActiveException();
    }

    const availableUser = await this.getActiveAccount(userId);

    if (!availableUser) {
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
