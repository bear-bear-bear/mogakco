import React, { useEffect } from 'react';
import useSocket from '@hooks/useSocket';
import Chat from '../Chat';

import * as S from './style';

interface Message {
  id: number;
  username: string;
  message: string;
  type: 'enter' | 'chat' | 'kick' | 'file';
}

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
  const { client } = useSocket();

  useEffect(() => {
    client?.on('chat', (message: string) => {
      console.log('chat: ', message);
    });
    client?.on('exitUser', (message: string) => {
      console.log(message);
    });
    client?.on('enterRoom', (message: string) => {
      console.log(message);
    });
  });
  return (
    <S.ChatList>
      {dummyChatData.map((chat) => (
        <Chat key={chat.id} {...chat} />
      ))}
    </S.ChatList>
  );
};

export default ChatList;
