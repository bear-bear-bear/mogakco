import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { SocketContext } from '@pages/video-chat/[id]';
import * as S from './style';

interface IProps {
  children?: ReactNode;
}

const Container = ({ children }: IProps) => {
  const [memberCount, setMemberCount] = useState<number>(0);
  const client = useContext(SocketContext);

  useEffect(() => {
    client?.on('member-count', (count: number) => {
      setMemberCount(count);
    });

    return () => {
      client?.off('member-count');
    };
  }, [client]);

  return (
    <S.Container>
      <S.Header>
        <S.ChatCloseButton />
        <S.ChatTitle>채팅</S.ChatTitle>
        <S.ChatMemberCount>{memberCount}</S.ChatMemberCount>
      </S.Header>
      {children}
    </S.Container>
  );
};

export default Container;
