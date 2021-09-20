import { Socket } from 'socket.io-client';

export interface ComponentSocketProps {
  client: Socket | null;
}

export interface ChatAnnouncement {
  id: string;
  username: string;
  type: 'enter' | 'exit' | 'kick';
}

export interface ChatMessage {
  type: 'chat';
  id: number;
  ownerId: number;
  username: string;
  message: string;
}

export interface ChatFile {
  type: 'file';
  id: number;
  ownerId: number;
  username: string;
  info: { filename: string; size: number; url: string };
}
