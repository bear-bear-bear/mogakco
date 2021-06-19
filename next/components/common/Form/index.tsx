import React, { FC, FormHTMLAttributes } from 'react';

import * as S from './style';

const Form: FC<FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  ...rest
}) => <S.Form {...rest}>{children}</S.Form>;

export default Form;
