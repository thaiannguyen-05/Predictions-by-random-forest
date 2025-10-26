import { Body, Controller, Put, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import type { Request } from 'express';
import { ChangeDetailDto } from './dto/change-detail.dto';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('change-detail-user')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update user profile details',
    description:
      'Update authenticated user profile information including username, names, phone, date of birth, and avatar',
  })
  @ApiBody({
    type: ChangeDetailDto,
    description: 'User profile update data',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            username: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            phoneNumber: { type: 'string', nullable: true },
            dateOfBirth: {
              type: 'string',
              format: 'date-time',
              nullable: true,
            },
            avtUrl: { type: 'string', nullable: true },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid or missing token',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found or not active',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error',
  })
  async changeDetalUser(@Req() req: Request, @Body() dto: ChangeDetailDto) {
    return this.userService.changeDetail(req, dto);
  }
}
