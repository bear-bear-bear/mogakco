import React, { useContext } from 'react';
import useUser from '@hooks/useUser';
import type { ChatMessage } from 'typings/chat';

import { MdViewerContext } from '../ChatList';
import * as S from './style';

const TextChat = ({ username, message, ownerId }: ChatMessage) => {
  const { user } = useUser();
  const MdViewer = useContext(MdViewerContext);

  return (
    <S.ChatWrapper>
      <S.Writer isMyChat={ownerId === user?.id}>{username}</S.Writer>
      <MdViewer initialValue={message} />
    </S.ChatWrapper>
  );
};

export default TextChat;
