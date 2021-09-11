import { IncomingHttpHeaders } from 'http';
import UserEntity from '@models/user/entities/user.entity';
import RoomEntity from '@models/chat/entities/room.entity';

export interface LeaveRoom {
  username: string;
  roomId: number;
}

export interface Chat {
  id: number;
  username: string;
  message: string;
  type: 'my-chat' | 'chat';
}

export interface UserAndRoom {
  user: UserEntity;
  room: RoomEntity;
}

export interface IChatService {
  leaveRoom(headers: IncomingHttpHeaders): Promise<LeaveRoom>;

  makeAndSaveChat(headers: IncomingHttpHeaders, message: string): Promise<Chat[]>;

  findUserAndRoom(userId: number, roomId: number): Promise<UserAndRoom>;

  getIdsFromHeader(headers: IncomingHttpHeaders): number[];

  joinRoom(user: UserEntity, roomId: number): Promise<void>;

  createChatResponse(chatId: number, username: string, message: string, isOwner: boolean): Chat;
}
