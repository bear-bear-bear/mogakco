import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import dynamic from 'next/dynamic';
import { ViewerProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import { SocketContext } from '@pages/video-chat/[id]';
import { ChatAnnouncement, ChatMessage } from 'typings/chat';

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

const returnVoid = () => undefined;

const ChatList = () => {
  const [chatList, setChatList] = useState<Message[]>([]);
  const client = useContext(SocketContext);
  const chatListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!client) return returnVoid;

    const scrollToBottom = () => {
      if (!chatListRef.current) return;
      const chatListEl = chatListRef.current;
      chatListEl.scrollTop = chatListEl.scrollHeight;
    };

    const handleAddMessage = (newMessage: Message) => {
      setChatList((prev) => [...prev, newMessage]);
      scrollToBottom();
    };

    client.on('chat', handleAddMessage);
    client.on('exit', handleAddMessage);
    client.on('enter', handleAddMessage);

    return () => {
      client.off('chat');
      client.off('exit');
      client.off('enter');
    };
  });

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
