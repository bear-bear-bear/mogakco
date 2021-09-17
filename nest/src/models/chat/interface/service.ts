import { IncomingHttpHeaders } from 'http';
import UserEntity from '@models/user/entities/user.entity';
import RoomEntity from '@models/chat/entities/room.entity';
import { Server } from 'socket.io';

export interface LeaveRoom {
  username: string;
  roomId: number;
}

export interface Chat {
  id: number;
  ownerId: number;
  username: string;
  message: string;
  type: 'chat';
}

export interface UserAndRoom {
  user: UserEntity;
  room: RoomEntity;
}

export interface HandShakeAuth {
  [p: string]: any;
}

export interface FindRoomAndJoin {
  room: RoomEntity;
  isCreated: boolean;
}

export interface IChatService {
  getRecommendRoom(id: number): Promise<RoomEntity | FindRoomAndJoin>;

  joinRoom(user: UserEntity, roomId: number): Promise<void>;

  leaveRoom(headers: IncomingHttpHeaders): Promise<LeaveRoom>;

  checkDeleteRoom(headers: IncomingHttpHeaders): Promise<void>;

  findUserAndRoom(userId: number, roomId: number): Promise<UserAndRoom>;

  makeAndSaveChat(headers: IncomingHttpHeaders, message: string): Promise<Chat>;

  createChatResponse(chatId: number, ownerId: number, username: string, message: string): Chat;

  emitMemberCountEvent(server: Server, auth: HandShakeAuth): Promise<void>;

  emitEnterOrExitEvent(server: Server, username: string, type: 'enter' | 'exit'): void;

  getIdsFromHeader(headers: IncomingHttpHeaders): number[];
}
