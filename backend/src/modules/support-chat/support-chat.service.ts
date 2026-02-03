import {
  ChatSession,
  GenerativeModel,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { ResponseMessageDto } from './dto/response-message.dto';
import { MessageQueue } from './interfaces';
import { MessageService } from './service/message/message.service';
import { RoomService } from './service/room/room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FaqService } from './service/FAQ-service/Faq.service';
import { StockPredictionService } from '../stock/stock-prediction.service';
@Injectable()
export class SupportChatService {
  private readonly googleAi: GoogleGenerativeAI;
  private readonly mode: GenerativeModel;
  private chatSessions: { [sessionId: string]: ChatSession } = {};
  private readonly logger = new Logger(SupportChatService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly faqService: FaqService,
    private readonly stockService: StockPredictionService,
  ) {
    const geminiApikey = configService.getOrThrow<string>('GENEMI_API_KEY');
    const geminiVersion = configService.getOrThrow<string>('GENEMI_MODEL');

    this.googleAi = new GoogleGenerativeAI(geminiApikey);
    this.mode = this.googleAi.getGenerativeModel({
      model: geminiVersion,
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2000,
      },
    });
    this.logger.log(`Gemini AI initialized with model: ${geminiVersion}`);
  }

  private async getChatSession(
    sessionId: string,
    customerId: string,
    employeeId?: string,
  ) {
    try {
      const sessionIdToUse = sessionId || uuidv4();

      let result = this.chatSessions[sessionIdToUse];

      if (!result) {
        this.logger.log(`Creating new chat session: ${sessionIdToUse}`);
        result = this.mode.startChat({
          generationConfig: {
            maxOutputTokens: 2000,
            temperature: 0.7,
          },
        });
        this.chatSessions[sessionIdToUse] = result;

        const room: CreateRoomDto = {
          ...(employeeId && { employeeId }),
          customerId,
          sessionId: sessionIdToUse,
        };

        await this.roomService.createRoom(room);
      } else {
        this.logger.log(`Using existing chat session: ${sessionIdToUse}`);
      }

      return {
        sessionId: sessionIdToUse,
        chat: result,
      };
    } catch (error) {
      this.logger.error(`Error creating chat session: ${error.message}`);
      throw new Error(`Failed to create chat session: ${error.message}`);
    }
  }

  private async firstResponse(userId: string) {
    const availableUser = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!availableUser) throw new NotFoundException('User not found');

    try {
      const firstMessage = `📈 Chào mừng ${availableUser.username} đến với *Stock Prediction Assistant*! 
									Tôi có thể giúp bạn với các tính năng sau:

									1️⃣ **Kiểm tra kết nối ML Service**  
									→ /api/stock/health  
									Dùng để kiểm tra hệ thống dự đoán có đang hoạt động hay không.

									2️⃣ **Lấy giá cổ phiếu hiện tại**  
									→ /api/stock/current-price/:ticker  
									Ví dụ: /api/stock/current-price/AAPL

									3️⃣ **Dự đoán giá cổ phiếu trong vài giờ tới**  
									→ /api/stock/predictions/:ticker  
									Sử dụng mô hình Random Forest để dự đoán xu hướng giá ngắn hạn.

									4️⃣ **Phân tích tổng hợp cổ phiếu**  
									→ /api/stock/analysis/:ticker  
									Tổng hợp cả giá hiện tại và dữ liệu dự đoán.

									5️⃣ **Huấn luyện lại mô hình ML cho mã cổ phiếu**  
									→ POST /api/stock/train  
									Body: { "ticker": "AAPL" }

									🧠 Hãy gửi mã cổ phiếu bạn muốn phân tích (ví dụ: "AAPL") để tôi bắt đầu nhé!`;

      return firstMessage;
    } catch (error) {
      this.logger.error(`Error generating first response: ${error.message}`);
      return 'Xin chào! Tôi là trợ lý AI của ThaianthedevService. Tôi có thể giúp gì cho bạn?';
    }
  }

  private cleanUpOldSession() {
    const maxSessions = 100;
    const sessionIds = Object.keys(this.chatSessions);

    if (sessionIds.length > maxSessions) {
      const sessionsToRemove = sessionIds.slice(
        0,
        sessionIds.length - maxSessions,
      );
      sessionsToRemove.forEach((sessionId) => {
        delete this.chatSessions[sessionId];
      });
      this.logger.log(
        `Cleaned up ${sessionsToRemove.length} old chat sessions`,
      );
    }
  }

  async initialMessage(userId: string) {
    return this.firstResponse(userId);
  }

  async generateResponse(data: ResponseMessageDto) {
    if (!data.prompt || data.prompt.trim().length === 0) {
      throw new BadRequestException('Prompt cannot be empty');
    }

    const { sessionId, chat } = await this.getChatSession(
      data.sessionId,
      data.userId,
      data?.employeeId,
    );
    this.logger.log(`Sending prompt to Gemini AI for session: ${sessionId}`);

    const parts = data.prompt.trim().split(/\s+/);
    const opt = parts[0].toLowerCase();
    const arg = parts[1]?.toUpperCase();

    if (['1', '2', '3', '4', '5'].includes(opt)) {
      const userMessage = {
        content: data.prompt,
        roomId: sessionId,
        senderId: data.userId,
      };
      await this.messageService.createMessage(userMessage);

      try {
        if (opt === '1') {
          const res = await this.stockService.ping();
          const reply = res.success
            ? `✅ ML Service is available${res.message ? ': ' + res.message : ''}`
            : `❌ ML Service unavailable${res.error ? ': ' + res.error : ''}`;
          return { result: reply, sessionId };
        }

        if (!arg) {
          return {
            result:
              'Vui lòng gửi mã cổ phiếu sau lựa chọn, ví dụ: "2 AAPL" hoặc "3 AAPL"',
            sessionId,
          };
        }

        if (opt === '2') {
          const res = await this.stockService.getCurrentPrice(arg);
          if (!res.success)
            return { result: `Lấy giá thất bại: ${res.error}`, sessionId };
          return {
            result: `Giá hiện tại của ${arg}: ${res.current_price ?? res.price} (at ${res.current_time ?? res.time ?? res.timestamp})`,
            sessionId,
          };
        }

        if (opt === '3') {
          const res = await this.stockService.getPredictionsMultiHours(arg);
          if (!res.success)
            return { result: `Dự đoán thất bại: ${res.error}`, sessionId };
          return {
            result: `Dự đoán cho ${arg}: ${JSON.stringify(res.predictions ?? res.prediction)}`,
            sessionId,
          };
        }

        if (opt === '4') {
          const [financial, prediction] = await Promise.all([
            this.stockService.getFinancialData(arg),
            this.stockService.getPredictionSingle(arg),
          ]);
          if (!financial.success)
            return {
              result: `Phân tích thất bại: ${financial.error}`,
              sessionId,
            };
          if (!prediction.success)
            return {
              result: `Dự đoán thất bại: ${prediction.error}`,
              sessionId,
            };
          return {
            result: `Phân tích cho ${arg}:\nFinancial: ${JSON.stringify(financial.data ?? financial)}\nPrediction: ${JSON.stringify(prediction.predictions ?? prediction.prediction ?? prediction)}`,
            sessionId,
          };
        }

        if (opt === '5') {
          const res = await this.stockService.trainModel(arg);
          if (!res.success)
            return { result: `Train thất bại: ${res.error}`, sessionId };
          return {
            result: `Train started/completed: ${res.message ?? JSON.stringify(res)}`,
            sessionId,
          };
        }
      } catch (err) {
        this.logger.error(`Error handling menu option ${opt}: ${err.message}`);
        return {
          result: `Lỗi khi thực hiện yêu cầu: ${err.message}`,
          sessionId,
        };
      }
    }

    if (data.payload) {
      return this.faqService.handleFaq(data.payload);
    }

    const result = await chat.sendMessage(data.prompt);
    const response = result.response.text();

    const messageQueue: MessageQueue = {
      content: data.prompt,
      roomId: sessionId,
      senderId: data.userId,
    };

    await this.messageService.createMessage(messageQueue);

    if (!response) {
      throw new InternalServerErrorException('Empty response from Gemini AI');
    }

    this.logger.log(
      `Received response from Gemini AI for session: ${sessionId}`,
    );

    return {
      result: response,
      sessionId,
    };
  }
}
