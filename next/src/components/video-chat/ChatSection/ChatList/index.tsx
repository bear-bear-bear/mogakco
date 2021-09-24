import React, { createContext, useContext, useEffect, useState } from 'react';
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
  const [message, setMessage] = useState<Message[]>([]);
  const client = useContext(SocketContext);

  useEffect(() => {
    if (!client) return returnVoid;

    const addMessage = (info: Message) => {
      setMessage((prevState) => prevState.concat(info));
    };

    client.on('chat', addMessage);
    client.on('exit', addMessage);
    client.on('enter', addMessage);

    return () => {
      client.off('chat');
      client.off('exit');
      client.off('enter');
    };
  });

  return (
    <MdViewerContext.Provider value={Viewer}>
      <S.ChatList>
        {message?.map((chat) => (
          <Chat key={chat.id} {...chat} />
        ))}
      </S.ChatList>
    </MdViewerContext.Provider>
  );
};

export default ChatList;
