import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import Chat from '../Chat';

import * as S from './style';
import { ChatAnnouncement, ChatMessage } from '../../../../../typings/chat';

type Message = ChatMessage | ChatAnnouncement;

const ChatList = ({ client }: { client: Socket | null }) => {
  const [message, setMessage] = useState<Message[]>([]);

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
