import React, { FC } from 'react';

import * as S from './style';

interface Props {
  size?: 'small' | 'medium';
}

const Desc: FC<Props> = ({ size = 'medium', children, ...rest }) => (
  <S.Desc size={size} {...rest}>
    {children}
  </S.Desc>
);

export default Desc;
