import type { ReactNode } from 'react';

import * as S from './style';

export interface ContainerProps {
  children?: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <S.Container>{children}</S.Container>;
};

export default Container;
