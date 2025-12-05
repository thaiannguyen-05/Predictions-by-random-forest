import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { SupportChatService } from './support-chat.service';
import { ResponseMessageDto } from './dto/response-message.dto';
import { Public } from '../../common/decorator/public.decorator';

@ApiTags('Support Chat')
@Public()
@Controller('chat')
export class SupportChatController {
  constructor(private readonly supportChatService: SupportChatService) {}

  @Post('call-chat')
  @ApiOperation({
    summary: 'Send message to AI support chat',
    description:
      'Send a user message/prompt to the AI support chat system and receive an AI-generated response. Supports conversation continuity via sessionId.',
  })
  @ApiBody({
    type: ResponseMessageDto,
    description: 'Chat message data including prompt, sessionId, and userId',
  })
  @ApiResponse({
    status: 200,
    description: 'AI response generated successfully',
    schema: {
      type: 'object',
      properties: {
        response: {
          type: 'string',
          example: 'Dưới đây là một số laptop gaming dưới 20 triệu...',
          description: 'AI-generated response message',
        },
        sessionId: {
          type: 'string',
          example: 'uuid-session-id',
          description: 'Session ID for conversation tracking',
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          example: '2025-11-30T07:00:00Z',
          description: 'Response timestamp',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error or missing required fields',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['Prompt cannot be empty'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error - AI service unavailable',
  })
  async generateResponse(@Body() data: ResponseMessageDto) {
    return this.supportChatService.generateResponse(data);
  }

  @Get('init-chat')
  @ApiOperation({
    summary: 'Initialize new chat session',
    description:
      'Initialize a new chat session for a user and receive welcome message with initial context',
  })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: 'string',
    description: 'User ID to initialize chat session for',
    example: 'user-uuid-123',
  })
  @ApiResponse({
    status: 200,
    description: 'Chat session initialized successfully',
    schema: {
      type: 'object',
      properties: {
        sessionId: {
          type: 'string',
          example: 'session-uuid-456',
          description: 'New session ID for this chat',
        },
        welcomeMessage: {
          type: 'string',
          example: 'Xin chào! Tôi có thể giúp gì cho bạn?',
          description: 'Initial welcome message from AI',
        },
        userId: {
          type: 'string',
          example: 'user-uuid-123',
          description: 'User ID associated with this session',
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          example: '2025-11-30T07:00:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - userId is required',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error - failed to initialize chat',
  })
  async initChat(@Query('userId') userId: string) {
    return this.supportChatService.initialMessage(userId);
  }
}
