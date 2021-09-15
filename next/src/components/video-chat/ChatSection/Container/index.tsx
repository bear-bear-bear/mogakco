import React, { ReactNode, useEffect, useState } from 'react';
import * as S from './style';
import { ComponentSocketProps } from '../../../../../typings/chat';

interface IProps {
  children?: ReactNode;
}

const Container = ({ children, client }: IProps & ComponentSocketProps) => {
  const [memberCount, setMemberCount] = useState<number>(0);

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
        <S.DropdownButton />
        <S.ChatTitle>채팅</S.ChatTitle>
        <S.ChatMemberCount>{memberCount}</S.ChatMemberCount>
      </S.Header>
      {children}
    </S.Container>
  );
};

export default Container;
