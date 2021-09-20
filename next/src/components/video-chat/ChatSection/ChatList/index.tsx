import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@pages/video-chat/[id]';

import Chat from '../Chat';
import { ChatAnnouncement, ChatMessage } from '../../../../../typings/chat';

import * as S from './style';

type Message = ChatMessage | ChatAnnouncement;

const ChatList = () => {
  const [message, setMessage] = useState<Message[]>([]);
  const client = useContext(SocketContext);

  useEffect(() => {
    if (!client) return;

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
    <S.ChatList>
      {message?.map((chat) => (
        <Chat key={chat.id} {...chat} />
      ))}
    </S.ChatList>
  );
};

export default ChatList;
