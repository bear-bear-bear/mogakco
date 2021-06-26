import React, { ReactNode } from 'react';
import * as S from './style';

interface IProps {
  children?: ReactNode;
}

const Container = ({ children }: IProps) => {
  return (
    <S.Container>
      <S.Header>
        <S.DropdownButton />
        <S.ChatTitle>채팅</S.ChatTitle>
      </S.Header>
      {children}
    </S.Container>
  );
};

export default Container;
