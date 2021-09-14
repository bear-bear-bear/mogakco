import React from 'react';
import type { ReactNode } from 'react';

import * as S from './style';

export interface IProps {
  children?: ReactNode;
  scale?: 'small' | 'medium';
}

const Desc = ({ scale = 'medium', children, ...rest }: IProps) => (
  <S.Desc scale={scale} {...rest}>
    {children}
  </S.Desc>
);

export default Desc;
