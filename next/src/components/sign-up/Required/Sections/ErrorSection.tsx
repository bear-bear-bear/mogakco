import React from 'react';
import type { FieldErrors } from 'react-hook-form';

import Warning from '@components/common/Warning';

import type { InputValues } from '../typings';

interface IProps {
  errors: FieldErrors<InputValues>;
}

const ErrorSection = ({ errors }: IProps) => {
  const {
    username: usernameError,
    password: passwordError,
    passwordConfirm: passwordConfirmError,
    term: termError,
  } = errors;

  return (
    <>
      {usernameError && <Warning>{usernameError.message}</Warning>}
      {passwordError && <Warning>{passwordError.message}</Warning>}
      {passwordConfirmError && (
        <Warning>{passwordConfirmError.message}</Warning>
      )}
      {termError && <Warning>{termError.message}</Warning>}
    </>
  );
};

export default ErrorSection;
