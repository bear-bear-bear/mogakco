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
  id: number;
  ownerId: number;
  username: string;
  message: string;
  type: 'chat';
}

export interface ChatFile {
  id: string;
  username: string;
  info: { filename: string; size: number; url: string };
  type: 'file';
}
