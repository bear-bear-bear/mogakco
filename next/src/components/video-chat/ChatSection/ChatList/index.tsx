import React, { createContext, useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { ViewerProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import useChatClient from '@hooks/chat/useChatClient';

import { ChatAnnouncement, ChatMessage } from 'typings/chat';

import useChatEvent from '@hooks/chat/useChatEvent';
import Chat from '../Chat';
import * as S from './style';

export type Message = ChatMessage | ChatAnnouncement;

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

  const isScrollAtBottomEnd = useCallback(() => {
    if (!chatListRef.current) return false;

    const chatListEl = chatListRef.current;
    const { scrollHeight, clientHeight, scrollTop } = chatListEl;

    return scrollTop === scrollHeight - clientHeight;
  }, []);

  const scrollToBottom = useCallback(() => {
    if (!chatListRef.current) return;

    const chatListEl = chatListRef.current;
    const { scrollHeight, clientHeight } = chatListEl;

    chatListEl.scrollTop = scrollHeight - clientHeight;
  }, []);

  const handleAddMessage = useCallback(
    (newMessage: Message) => {
      const isScrollAtBottomBeforeAdd = isScrollAtBottomEnd();
      setChatList((prev) => [...prev, newMessage]);

      if (isScrollAtBottomBeforeAdd) {
        scrollToBottom();
      }
    },
    [isScrollAtBottomEnd, scrollToBottom],
  );

  useChatEvent(socketClient, handleAddMessage);

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
