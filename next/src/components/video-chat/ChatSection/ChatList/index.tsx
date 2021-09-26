import React, { createContext, useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ViewerProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import useChatClient from '@hooks/chat/useChatClient';

import { ChatAnnouncement, ChatMessage } from 'typings/chat';

import { ChatEvent } from '@lib/enum';
import Chat from '../Chat';
import * as S from './style';

type Message = ChatMessage | ChatAnnouncement;

const Viewer = dynamic<ViewerProps>(
  () => import('@toast-ui/react-editor').then((m) => m.Viewer),
  {
    ssr: false,
  },
);
export const MdViewerContext = createContext(Viewer);

const ChatList = () => {
  const [chatList, setChatList] = useState<Message[]>([]);
  const socketClient = useChatClient();
  const chatListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (!chatListRef.current) return;

      const chatListEl = chatListRef.current;
      const { scrollHeight, clientHeight, scrollTop } = chatListEl;

      const scrollTopMaxPixel = scrollHeight - clientHeight;
      const isScrollAtNearlyEnd = scrollTop > scrollTopMaxPixel - clientHeight;
      if (!isScrollAtNearlyEnd) return;

      chatListEl.scrollTop = scrollTopMaxPixel;
    };

    const handleAddMessage = (newMessage: Message) => {
      setChatList((prev) => [...prev, newMessage]);
      scrollToBottom();
    };

    socketClient.on(ChatEvent.SEND_CHAT, handleAddMessage);
    socketClient.on(ChatEvent.ROOM_EXIT, handleAddMessage);
    socketClient.on(ChatEvent.ROOM_ENTER, handleAddMessage);

    return () => {
      socketClient.off(ChatEvent.SEND_CHAT);
      socketClient.off(ChatEvent.ROOM_EXIT);
      socketClient.off(ChatEvent.ROOM_ENTER);
    };
  }, [socketClient]);

  return (
    <MdViewerContext.Provider value={Viewer}>
      <S.ChatList ref={chatListRef}>
        {chatList?.map((chat) => (
          <Chat key={chat.id} {...chat} />
        ))}
      </S.ChatList>
    </MdViewerContext.Provider>
  );
};

export default ChatList;
