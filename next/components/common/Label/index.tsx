import Reac from 'react';
import type { LabelHTMLAttributes, ReactNode } from 'react';

import * as S from './style';

/**
 * @desc label의 기본 스타일을 정의합니다. common/Input 과 함께 사용한다면 scale 값을 맞춰주세요.
 * direction은 정의할 input의 상대적인 방향을 말합니다. 해당 방향으로 margin 이 적용됩니다.
 */

export interface IProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode;
  scale?: 'small' | 'medium';
  direction: 'right' | 'left' | 'top' | 'bottom';
}

const Label = ({ scale = 'medium', direction, children, ...rest }: IProps) => (
  <S.Label scale={scale} direction={direction} {...rest}>
    {children}
  </S.Label>
);

export default Label;
