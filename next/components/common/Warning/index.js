import React from 'react';

import * as S from './style';

const Warning = ({ children, ...rest }) => (
  <S.Warning {...rest}>{children}</S.Warning>
);

export default Warning;
