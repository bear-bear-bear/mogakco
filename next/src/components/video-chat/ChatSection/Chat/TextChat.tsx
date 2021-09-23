import React, { useContext } from 'react';

import useUser from '@hooks/useUser';
import type { ChatMessage } from 'typings/chat';

import { MDPreviewContext } from '..';
import * as S from './style';

const TextChat = ({ username, message, ownerId }: ChatMessage) => {
  const { user } = useUser();
  const MDPreview = useContext(MDPreviewContext);

  return (
    <S.ChatWrapper isMyChat={ownerId === user?.id}>
      <S.Writer>{username}</S.Writer>
      <MDPreview source={message} />
    </S.ChatWrapper>
  );
};

export default TextChat;
