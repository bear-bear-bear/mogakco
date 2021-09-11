import { Socket } from 'socket.io';

// TODO: Dto 교체
export interface JoinChatRoom {
  userId: number;
  roomId: string;
}

export interface Join {
  joinedUserName: string;
  joinedRoomId: number;
}

export interface IChatGateway {
  join(client: Socket, { roomId, userId }: JoinChatRoom): Promise<Join>;

  chat(client: Socket, message: string): Promise<void>;
}
