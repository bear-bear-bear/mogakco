import { useContext } from 'react';
import { SocketContext } from '@pages/video-chat/[id]';
import { Socket } from 'socket.io-client';

/**
 * @desc Context API 에서 Socket Client 를 쉽게 가져올 수 있도록 제공하는 훅
 */
export default function useChatClient(): Socket {
  return useContext(SocketContext);
}
