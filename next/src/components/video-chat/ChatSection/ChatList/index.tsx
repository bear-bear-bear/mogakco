import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@pages/video-chat/[id]';
import Chat from '../Chat';

import * as S from './style';
import { ChatAnnouncement, ChatMessage } from '../../../../../typings/chat';

type Message = ChatMessage | ChatAnnouncement;

const ChatList = () => {
  const [message, setMessage] = useState<Message[]>([]);
  const client = useContext(SocketContext);

  useEffect(() => {
    client?.on('chat', (info: ChatMessage) => {
      setMessage((prevState) => prevState.concat(info));
    });
    client?.on('exit', (info: ChatAnnouncement) => {
      setMessage((prevState) => prevState.concat(info));
    });
    client?.on('enter', (info: ChatAnnouncement) => {
      setMessage((prevState) => prevState.concat(info));
    });
    return () => {
      client?.off('chat');
      client?.off('exit');
      client?.off('enter');
    };
  });

  return (
    <S.ChatList>
      {message?.map((chat) => (
        <Chat key={chat.id} {...chat} />
      ))}
    </S.ChatList>
  );
};

export default ChatList;
