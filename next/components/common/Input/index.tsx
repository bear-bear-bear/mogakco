import React from 'react';
import {
  IDefaultProps,
  IPasswordProps,
  IEmailProps,
  TotalProps,
} from './typings';
import {
  DefaultInput,
  CheckboxInput,
  PasswordInput,
  EmailInput,
} from './components';

function Input(props: TotalProps, ref: React.Ref<HTMLInputElement>) {
  switch (props.type) {
    case 'text':
      return <DefaultInput forwardedRef={ref} {...(props as IDefaultProps)} />;
    case 'checkbox':
      return <CheckboxInput forwardedRef={ref} {...(props as IDefaultProps)} />;
    case 'password':
      return (
        <PasswordInput forwardedRef={ref} {...(props as IPasswordProps)} />
      );
    case 'email':
      return <EmailInput forwardedRef={ref} {...(props as IEmailProps)} />;
    default:
      return <DefaultInput forwardedRef={ref} {...(props as IDefaultProps)} />;
  }
}
Input.displayName = 'Input';

export default React.forwardRef<HTMLInputElement, TotalProps>(Input);
