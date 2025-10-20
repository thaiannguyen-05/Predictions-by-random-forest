import { Controller, Logger } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import type { MessageQueue } from "../../interfaces/support-chat.interface";
import { BatchInsertService } from "./batchInsert.service";
import { RedisService } from "../redis.service";

@Controller()
export class MessageConsumer {
	private readonly logger = new Logger(MessageConsumer.name);

	constructor(
		private readonly batchInSertService: BatchInsertService,
		private readonly redisService: RedisService
	) { }

	@EventPattern('send-message')
	async handleSendMessage(@Payload() data: MessageQueue) {
		try {
			// 1️⃣ Lưu vào Redis (Realtime Layer) - Fast read
			await this.redisService.saveMessageToRedis(data);

			// 2️⃣ Publish qua Redis Pub/Sub cho WebSocket
			await this.redisService.publishMessage(`room:${data.roomId}`, data);

			// 3️⃣ Thêm vào batch queue để insert PostgreSQL
			await this.batchInSertService.insertMessageInQueue(data);

			this.logger.debug(`✅ Processed message: room=${data.roomId}`);
		} catch (error) {
			this.logger.error('❌ Error handling message', error);
			// Có thể retry hoặc ghi vào dead letter queue
		}
	}
}
