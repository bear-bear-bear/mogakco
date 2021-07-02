import React, { InputHTMLAttributes, Dispatch, SetStateAction } from 'react';
import { UseFormSetValue } from 'react-hook-form';

export interface IDefaultProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'checkbox' | 'text' | 'password' | 'email';
  scale?: 'small' | 'medium';
  forwardedRef?: React.Ref<HTMLInputElement>;
}

export interface IPasswordUniqueProps {
  isVisible: boolean;
  onClickEye: () => void;
}
export type IPasswordProps = IDefaultProps & IPasswordUniqueProps;

export interface IEmailUniqueProps {
  isEmail: boolean;
  resetEmail: () => void;
}
export type IEmailProps = IDefaultProps & IEmailUniqueProps;

// ./index.tsx에서 export 되는 컴포넌트 Props의 type
// IDefaultProps에 없는 IPasswordProps와 IEmailProps 등의 각 타입별 컴포넌트 고유 정보들은 optional하게 변경
export type TotalProps = IDefaultProps &
  Partial<IPasswordUniqueProps> &
  Partial<IEmailUniqueProps>;
