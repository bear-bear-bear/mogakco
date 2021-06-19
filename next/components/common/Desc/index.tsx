import React, { FC } from 'react';

import * as S from './style';

interface Props {
  scale?: 'small' | 'medium';
}

const Desc: FC<Props> = ({ scale = 'medium', children, ...rest }) => (
  <S.Desc scale={scale} {...rest}>
    {children}
  </S.Desc>
);

export default Desc;
