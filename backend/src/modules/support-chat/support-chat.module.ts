import { Module } from "@nestjs/common";
import { SupportChatService } from "./support-chat.service";

@Module({
	providers: [SupportChatService]
})
export class SupportChatModule {

}