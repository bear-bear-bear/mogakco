import { IDefaultProps, IPasswordProps, IEmailProps } from './typings';

import * as S from './style';

const DEFAULT_SCALE = 'medium';

/**
 * @desc input(type="checkbox") 컴포넌트입니다.
 * 체크박스의 크기가 커져 사용자 편의성이 올라갑니다.
 */
export const DefaultInput = ({
  forwardedRef,
  scale = DEFAULT_SCALE,
  ...rest
}: IDefaultProps) => (
  <S.DefaultInput ref={forwardedRef} scale={scale} {...rest} />
);

/**
 * @desc input(type="checkbox") 컴포넌트입니다.
 * 체크박스의 크기가 커져 사용자 편의성이 올라갑니다.
 * scale prop이 없음에 주의하세요.
 */
export const CheckboxInput = ({ forwardedRef, ...rest }: IDefaultProps) => (
  <S.CheckboxInput ref={forwardedRef} {...rest} />
);

/**
 * @desc input(type="password") 컴포넌트입니다.
 * visible 상태를 끄고 켤 수 있는 버튼을 가졌습니다.
 * 컴포넌트를 관리할 isVisible, onClickEye은 부모 컴포넌트에서 props로 부여합니다.
 */
export const PasswordInput = ({
  forwardedRef,
  scale = DEFAULT_SCALE,
  isVisible,
  onClickEye,
  type,
  ...rest
}: IPasswordProps) => (
  <S.RelativeWrapper>
    <S.DefaultInput
      ref={forwardedRef}
      scale={scale}
      type={isVisible ? 'text' : type}
      {...rest}
    />
    {isVisible && <S.CloseEye onClick={onClickEye} />}
    {!isVisible && <S.OpenEye onClick={onClickEye} />}
  </S.RelativeWrapper>
);

/**
 * @desc input(type="email") 컴포넌트입니다.
 * 현재 입력 중인 값을 취소할 수 있는 버튼을 가졌습니다.
 * useState hook의 리턴값인 value, setValue 를 인자로 받습니다.
 */
export const EmailInput = ({
  forwardedRef,
  scale = DEFAULT_SCALE,
  value,
  setValue,
  ...rest
}: IEmailProps) => (
  <S.RelativeWrapper>
    <S.DefaultInput ref={forwardedRef} scale={scale} value={value} {...rest} />
    {value && <S.DeleteButton onClick={() => setValue('')} />}
  </S.RelativeWrapper>
);
