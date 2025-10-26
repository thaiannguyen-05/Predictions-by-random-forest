import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteMessageDto {
  @IsString()
  @IsNotEmpty()
  senderId: string;

  @IsString()
  @IsNotEmpty()
  messageId: string;
}
