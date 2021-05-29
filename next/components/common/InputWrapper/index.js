import React from 'react';

import * as S from './style';

/**
 * @desc label과 input을 묶기 위한 inputWrapper
 * flex-direction: column; 입니다.
 */
const InputWrapper = ({ children, ...rest }) => (
  <S.InputWrapper {...rest}>{children}</S.InputWrapper>
);

export default InputWrapper;
