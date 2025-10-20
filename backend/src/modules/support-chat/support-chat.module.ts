import { Module } from "@nestjs/common";
import { SupportChatService } from "./support-chat.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MessageService } from "./service/message.service";
import { MessageProducer } from "./service/queue_service/message.producer";
import { MessageConsumer } from "./service/queue_service/message.consumer";
import { BatchInsertService } from "./service/queue_service/batchInsert.service";
import { RedisService } from "./service/redis.service";
import { PrismaService } from "src/prisma/prisma.service";
import { TestController } from "./service/test.controller";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'MESSAGE_QUEUE',
				transport: Transport.RMQ,
				options: {
					urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
					queue: 'message_queue',
					queueOptions: {
						durable: true,
					},
				}
			}
		])
	],
	providers: [
		SupportChatService,
		MessageService,
		MessageProducer,
		BatchInsertService,
		RedisService,
		PrismaService
	],
	controllers: [MessageConsumer, TestController],
	exports: [MessageService, RedisService]
})
export class SupportChatModule {

}
