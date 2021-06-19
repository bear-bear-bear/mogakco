import React, { FC, HTMLAttributes } from 'react';

import * as S from './style';

const Warning: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  ...rest
}) => <S.Warning {...rest}>{children}</S.Warning>;

export default Warning;
