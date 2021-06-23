import React, {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  InputHTMLAttributes,
} from 'react';

// FIXME: HTMLInputElement를 extend 할 시 emotion 컴포넌트에 의해 거부됨.. 사용한 html 속성을 다 직접 정의해야 할 것 같은데 다른 방법은 없을지 ㅠ
export interface IDefaultProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'checkbox' | 'text' | 'password' | 'email';
  scale?: 'small' | 'medium';
  name?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  forwardedRef?: React.Ref<HTMLInputElement>;
}

export interface IPasswordUniqueProps {
  isVisible: boolean;
  onClickEye: () => void;
}
export type IPasswordProps = IDefaultProps & IPasswordUniqueProps;

export interface IEmailUniqueProps {
  value: string | number;
  setValue: Dispatch<SetStateAction<string>>;
}
export type IEmailProps = IDefaultProps & IEmailUniqueProps;

// ./index.tsx에서 export 되는 컴포넌트 Props의 type
// IDefaultProps에 없는 IPasswordProps와 IEmailProps 등의 각 타입별 컴포넌트 고유 정보들은 optional하게 변경
export type TotalProps = IDefaultProps &
  Partial<IPasswordUniqueProps> &
  Partial<IEmailUniqueProps>;
