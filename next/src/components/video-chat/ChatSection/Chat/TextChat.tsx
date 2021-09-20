import React from 'react';
import useUser from '@hooks/useUser';
import type { ChatMessage } from 'typings/chat';

import * as S from './style';

const TextChat = ({ username, message, ownerId }: ChatMessage) => {
  const { user } = useUser();

  return (
    <S.ChatWrapper isMyChat={ownerId === user?.id}>
      <S.Writer>{username}</S.Writer>
      <S.TextContent>{message}</S.TextContent>
    </S.ChatWrapper>
  );
};

export default TextChat;
