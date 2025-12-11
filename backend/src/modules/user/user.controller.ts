import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import type { Request } from 'express';
import { ChangeDetailDto } from './dto/change-detail.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import type {
  ChunkUploadSession,
  UploadChunkResponse,
} from './interfaces/chunk-upload.interface';

// Directories
const UPLOAD_DIR = './upload';
const TEMP_DIR = join(UPLOAD_DIR, 'temp');

// Ensure directories exist
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Storage for chunk uploads - save with temporary random name
const chunkStorage = {
  storage: diskStorage({
    destination: TEMP_DIR,
    filename: (req, file, cb) => {
      const tempName = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      cb(null, tempName);
    },
  }),
};

// In-memory tracking of uploaded chunks per session
const uploadSessions: Map<string, ChunkUploadSession> = new Map();

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('upload-avatar-chunk')
  @ApiBearerAuth('JWT-auth')
  @UseInterceptors(FileInterceptor('file', chunkStorage))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload user avatar in chunks' })
  async uploadAvatarChunk(
    @UploadedFile() file: Express.Multer.File,
    @Body('sessionId') sessionId: string,
    @Body('index') indexStr: string,
    @Body('totalChunks') totalChunksStr: string,
    @Body('originalName') originalName: string,
  ): Promise<UploadChunkResponse> {
    if (!file) {
      throw new BadRequestException('No file chunk provided');
    }

    const index = Number(indexStr);
    const totalChunks = Number(totalChunksStr);

    // Validate inputs
    if (!sessionId || isNaN(index) || isNaN(totalChunks) || !originalName) {
      // Cleanup uploaded file
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      throw new BadRequestException('Missing required fields');
    }

    // Initialize or get session
    if (!uploadSessions.has(sessionId)) {
      uploadSessions.set(sessionId, {
        chunks: new Map(),
        total: totalChunks,
        originalName,
      });
    }

    const session = uploadSessions.get(sessionId)!;
    session.chunks.set(index, file.path);

    // Check if all chunks received
    if (session.chunks.size === session.total) {
      // Merge chunks
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(session.originalName);
      const finalFilename = `avatar-${uniqueSuffix}${ext}`;
      const finalPath = join(UPLOAD_DIR, finalFilename);

      // Create write stream
      const writeStream = fs.createWriteStream(finalPath);

      // Write chunks in order
      for (let i = 0; i < session.total; i++) {
        const chunkPath = session.chunks.get(i);
        if (!chunkPath || !fs.existsSync(chunkPath)) {
          writeStream.close();
          // Cleanup
          this.cleanupSession(sessionId);
          throw new BadRequestException(`Missing chunk ${i}`);
        }
        const chunkData = fs.readFileSync(chunkPath);
        writeStream.write(chunkData);
      }

      writeStream.end();

      // Wait for write to complete
      await new Promise<void>((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });

      // Cleanup temp chunks
      this.cleanupSession(sessionId);

      return {
        status: 'complete',
        url: `http://localhost:4000/upload/${finalFilename}`,
      };
    }

    return {
      status: 'chunk_received',
      index,
      received: session.chunks.size,
      total: session.total,
    };
  }

  private cleanupSession(sessionId: string): void {
    const session = uploadSessions.get(sessionId);
    if (session) {
      session.chunks.forEach((chunkPath) => {
        if (fs.existsSync(chunkPath)) {
          fs.unlinkSync(chunkPath);
        }
      });
      uploadSessions.delete(sessionId);
    }
  }

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

  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get authenticated user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
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
  async getMe(@Req() req: Request) {
    return this.userService.me(req);
  }
}
