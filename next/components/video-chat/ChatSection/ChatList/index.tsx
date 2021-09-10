import React, { useEffect, useState } from 'react';
import useSocket from '@hooks/useSocket';
import Chat from '../Chat';

import * as S from './style';

interface Message {
  id: number;
  username: string;
  message: string;
  type: 'enter' | 'chat' | 'kick' | 'file' | 'my-chat';
}

interface Announcement {
  type: 'kick' | 'enter' | 'exit';
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
  const [message, setMessage] = useState<Message[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const { client } = useSocket();

  useEffect(() => {
    client?.on('chat', (info: Message) => {
      setMessage((prevState) => prevState.concat(info));
    });
    client?.on('exitUser', (msg: string) => {
      console.log(msg);
    });
    client?.on('enterRoom', (msg: string) => {
      console.log(msg);
    });
    return () => {
      client?.off('chat');
      client?.off('exitUser');
      client?.off('enterRoom');
    };
  });

  useEffect(() => {
    console.log({ message });
  }, [message]);

  return (
    <S.ChatList>
      {message?.map((chat) => (
        <Chat key={chat.id} {...chat} />
      ))}
    </S.ChatList>
  );
};

export default ChatList;
