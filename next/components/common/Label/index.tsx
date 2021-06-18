import React, { FC, HTMLAttributes, LabelHTMLAttributes } from 'react';

import * as S from './style';

/**
 * @desc label의 기본 스타일을 정의합니다. common/TextInput 와 함께 사용한다면 size 값을 맞춰주세요.
 * direction은 정의할 input의 상대적인 방향을 말합니다. 해당 방향으로 margin 이 적용됩니다.
 */

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'small' | 'medium';
  direction: 'right' | 'left' | 'top' | 'bottom';
}

const Label: FC<Props> = ({
  size = 'medium',
  direction,
  children,
  ...rest
}) => (
  <S.Label size={size} direction={direction} {...rest}>
    {children}
  </S.Label>
);

export default Label;
