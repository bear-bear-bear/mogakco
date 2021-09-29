import { forwardRef } from 'react';
import type { MouseEvent, ButtonHTMLAttributes } from 'react';

import * as S from './style';

export interface SVGButtonProps {
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  SvgComponent: any;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SVGButton = forwardRef<HTMLButtonElement, SVGButtonProps>(
  ({ SvgComponent, buttonProps, onClick }, ref) => (
    <S.SVGButton ref={ref} onClick={onClick} {...buttonProps}>
      <SvgComponent />
    </S.SVGButton>
  ),
);

SVGButton.displayName = 'SVGButton';

export default SVGButton;
