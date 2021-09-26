import { Socket } from 'socket.io-client';
import { Message } from '@components/video-chat/ChatSection/ChatList';
import { useEffect } from 'react';
import { ChatEvent } from '@lib/enum';

/**
 * @desc 채팅, 유저 입장, 유저 퇴장 등 일반적인 채팅 이벤트를 제어합니다.
 * @state 채팅방 메시지에 관한 상태를 관리합니다.
 */
export default function useChatEvent(
  socketClient: Socket,
  handleAddMessage: (newMessage: Message) => void,
) {
  useEffect(() => {
    socketClient.on(ChatEvent.SEND_CHAT, handleAddMessage);
    socketClient.on(ChatEvent.ROOM_EXIT, handleAddMessage);
    socketClient.on(ChatEvent.ROOM_ENTER, handleAddMessage);

    return () => {
      socketClient.off(ChatEvent.SEND_CHAT);
      socketClient.off(ChatEvent.ROOM_EXIT);
      socketClient.off(ChatEvent.ROOM_ENTER);
    };
  }, [handleAddMessage, socketClient]);
}
