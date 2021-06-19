import React, { FC, HTMLAttributes } from 'react';

import * as S from './style';

/**
 * @desc label 과 input 을 묶기 위한 inputWrapper
 * flex-direction: column; 입니다.
 */
const InputWrapper: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => <S.InputWrapper {...rest}>{children}</S.InputWrapper>;

export default InputWrapper;
