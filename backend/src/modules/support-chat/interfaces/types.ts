import type { TypeMessage } from '../types';

export interface MessageQueue {
  message: string;
  typeMessage?: TypeMessage;
  senderId: string;
  receiverId: string;
  roomId: string;
  createdAt: Date;
}
