import React from 'react';

import * as S from './style';

const Form = ({ children, ...rest }) => <S.Form {...rest}>{children}</S.Form>;

export default Form;
