import { ReactNode } from 'react';
import * as S from './style';

interface IContainerProps {
  children?: ReactNode;
}

const Container = ({ children }: IContainerProps) => {
  return <S.Container>{children}</S.Container>;
};

export default Container;
