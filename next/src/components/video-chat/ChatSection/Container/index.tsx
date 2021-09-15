import React, { ReactNode, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import * as S from './style';

interface IProps {
  children?: ReactNode;
  client: Socket | null;
}

const Container = ({ children, client }: IProps) => {
  const [memberCount, setMemberCount] = useState<number>(0);

  useEffect(() => {
    client?.on('member-count', async (count: number) => {
      setMemberCount(count);
    });

    return () => {
      client?.off('member-count');
    };
  }, [client]);

  return (
    <S.Container>
      <S.Header>
        <S.DropdownButton />
        <S.ChatTitle>채팅</S.ChatTitle>
        <S.ChatMemberCount>{memberCount}</S.ChatMemberCount>
      </S.Header>
      {children}
    </S.Container>
  );
};

export default Container;
