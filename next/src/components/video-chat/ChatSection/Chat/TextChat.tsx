import React, { useContext } from 'react';

import useUser from '@hooks/useUser';
import type { ChatMessage } from 'typings/chat';

import { MDPreviewContext } from '..';
import * as S from './style';

const TextChat = ({ username, message, ownerId }: ChatMessage) => {
  const { user } = useUser();
  const MDPreview = useContext(MDPreviewContext);

  return (
    <S.ChatWrapper>
      <S.Writer isMyChat={ownerId === user?.id}>{username}</S.Writer>
      <MDPreview source={message} />
    </S.ChatWrapper>
  );
};

export default TextChat;
