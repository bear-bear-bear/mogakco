import React, { useEffect, useState } from 'react';
import useSocket from '@hooks/useSocket';
import Chat from '../Chat';

import * as S from './style';
import { ChatAnnouncement, ChatMessage } from '../../../../typings/chat';

type Message = ChatMessage | ChatAnnouncement;

const dummyChatData = [
  {
    id: 1,
    nickname: '용감한 너구리',
    type: 'enter',
  },
  {
    id: 2,
    nickname: '풋풋한 강아지',
    type: 'enter',
  },
  {
    id: 3,
    nickname: '용감한 너구리',
    content: '안녕하세요!',
    type: 'chat',
  },
  {
    id: 4,
    nickname: '용감한 너구리',
    content: {
      filename: '최신 기술 트렌드.png',
      size: '29200', // byte
      url: 'www.FILE_DOWNLOAD_URL',
    },
    type: 'file',
  },
  {
    id: 5,
    nickname: '깜찍한 달팽이',
    content: '안녕하세요!',
    type: 'chat',
  },
  {
    id: 6,
    nickname: '깜찍한 달팽이',
    type: 'kick',
  },
];

const ChatList = () => {
  const [message, setMessage] = useState<Message[]>([]);
  const { client } = useSocket();

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
