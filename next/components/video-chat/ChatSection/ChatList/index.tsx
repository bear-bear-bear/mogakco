import React from 'react';

import Chat, { IChatProps } from '../Chat';
import * as S from './style';

const dummyChatData: IChatProps[] = [
  {
    id: 1,
    name: '용감한 너구리',
    type: 'enter',
  },
  {
    id: 2,
    name: '풋풋한 강아지',
    type: 'enter',
  },
  {
    id: 3,
    name: '용감한 너구리',
    content: '안녕하세요!',
    type: 'chat',
  },
  {
    id: 4,
    name: '용감한 너구리',
    content: {
      filename: '최신 기술 트렌드.png',
      size: '29200', // byte
      url: 'www.FILE_DOWNLOAD_URL',
    },
    type: 'file',
  },
  {
    id: 5,
    name: '깜찍한 달팽이',
    content: '안녕하세요!',
    type: 'chat',
  },
];

const ChatList = () => {
  return (
    <S.ChatList>
      {dummyChatData.map((chat) => (
        <Chat key={chat.id} {...chat} />
      ))}
    </S.ChatList>
  );
};

export default ChatList;
