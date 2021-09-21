import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { SocketContext } from '@pages/video-chat/[id]';
import type { ChatSectionProps } from '..';
import * as S from './style';

export interface ContainerProps extends ChatSectionProps {
  children?: ReactNode;
}

const Container = ({ children, isShowChat, setIsShowChat }: ContainerProps) => {
  const [memberCount, setMemberCount] = useState<number>(0);
  const client = useContext(SocketContext);

  const handleChatCloseButtonClick = () => {
    setIsShowChat(false);
  };

  useEffect(() => {
    client?.on('member-count', (count: number) => {
      setMemberCount(count);
    });

    return () => {
      client?.off('member-count');
    };
  }, [client]);

  return (
    <S.Container isShow={isShowChat}>
      <S.Header>
        <S.ChatCloseButton onClick={handleChatCloseButtonClick} />
        <S.ChatTitle>채팅</S.ChatTitle>
        <S.ChatMemberCount>{memberCount}</S.ChatMemberCount>
      </S.Header>
      {children}
    </S.Container>
  );
};

export default Container;
