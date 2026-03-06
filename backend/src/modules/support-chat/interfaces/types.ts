import type { TypeMessage } from '../types';

export interface MessageQueue {
  content: string;
  typeMessage?: TypeMessage;
  senderId: string;
  receiverId?: string;
  roomId: string;
  createdAt?: Date;
}
