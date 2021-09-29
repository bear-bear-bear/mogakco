import React, { ReactNode, useEffect, useState } from 'react';
import { ChatEvent } from '@lib/enum';
import useChatClient from '@hooks/chat/useChatClient';

import useDropzone from './useDropzone';
import type { ChatSectionProps } from '..';
import * as S from './style';

export interface ContainerProps extends ChatSectionProps {
  children?: ReactNode;
}

const Container = ({ children, isShowChat, setIsShowChat }: ContainerProps) => {
  const [memberCount, setMemberCount] = useState<number>(0);
  const socketClient = useChatClient();
  const { getRootProps, getInputProps } = useDropzone();

  const handleChatCloseButtonClick = () => {
    setIsShowChat(false);
  };

  useEffect(() => {
    socketClient.on(ChatEvent.GET_MEMBER_COUNT, (count: number) => {
      setMemberCount(count);
    });

    return () => {
      socketClient.off(ChatEvent.GET_MEMBER_COUNT);
    };
  }, [socketClient]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <S.Container isShow={isShowChat}>
        <S.Header>
          <S.ChatCloseButton onClick={handleChatCloseButtonClick} />
          <S.ChatTitle>채팅</S.ChatTitle>
          <S.ChatMemberCount>{memberCount}</S.ChatMemberCount>
        </S.Header>
        {children}
      </S.Container>
    </div>
  );
};

export default Container;
