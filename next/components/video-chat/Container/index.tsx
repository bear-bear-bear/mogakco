import React, { ReactNode } from 'react';
import * as S from './style';

interface IProps {
  children?: ReactNode;
}

const Container = ({ children }: IProps) => {
  return <S.Container>{children}</S.Container>;
};

export default Container;
