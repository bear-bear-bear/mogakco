import React, { useContext } from 'react';
import useUser from '@hooks/useUser';
import type { ChatMessage } from 'typings/chat';

import { MdViewerContext } from '../ChatList';
import * as S from './style';

const Message = ({ username, message, ownerId }: ChatMessage) => {
  const { user } = useUser();
  const MdViewer = useContext(MdViewerContext);

  return (
    <S.MessageWrapper>
      <S.Writer isMyChat={ownerId === user?.id}>{username}</S.Writer>
      <MdViewer initialValue={message} />
    </S.MessageWrapper>
  );
};

export default Message;
