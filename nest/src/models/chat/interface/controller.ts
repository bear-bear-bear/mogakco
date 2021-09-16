import { Request, Response } from 'express';

export interface AvailableRoom {
  message: string;
  statusCode: number;
}

export interface MemberCount {
  memberCount: number;
}

export interface ChatRoomJoin {
  statusCode: number;
  roomId: number;
  message: string;
}

export interface IChatController {
  isAvailableChatRoom(roomId: number): Promise<AvailableRoom>;

  getMembers(roomId: number): Promise<MemberCount>;

  join(req: Request, res: Response): Promise<ChatRoomJoin | Pick<ChatRoomJoin, 'message'>>;
}
