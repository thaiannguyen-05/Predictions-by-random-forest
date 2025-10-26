import { TypeMessage } from '../types/message.types';

export interface MessageQueue {
  content: string;
  typeMessage?: TypeMessage;
  senderId: string;
  roomId: string;
  receiverId?: string;
}
