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
  // join(client: Socket, { roomId, userId }: JoinChatRoom): Promise<void>;

  chat(client: Socket, message: string): Promise<void>;
}

interface ChatType {
  type: 'my-chat' | 'chat' | 'enter' | 'exit' | 'kick' | 'file';
}

export interface ChatAnnouncement extends ChatType {
  target: string;
}

export interface ChatMessage extends ChatType {
  id: number;
  username: string;
  message: string;
}
