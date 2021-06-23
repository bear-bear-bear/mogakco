import React from 'react';
import Warning from '~/components/common/Warning';

import { InputErrorStates } from '../typings';

interface IProps {
  username: string;
  errorStates: InputErrorStates;
}

const ErrorSection = ({ username, errorStates }: IProps) => {
  const {
    isUsernameError,
    isPasswordTestError,
    isPasswordMatchError,
    isTermError,
  } = errorStates;

  return (
    <>
      {isUsernameError &&
        (username.length > 12 ? (
          <Warning>별명은 12자를 넘을 수 없습니다.</Warning>
        ) : (
          <Warning>형식에 맞는 별명을 입력하세요.</Warning>
        ))}
      {isPasswordTestError && (
        <Warning>형식에 맞는 비밀번호를 입력하세요.</Warning>
      )}
      {isPasswordMatchError && <Warning>비밀번호가 일치하지 않습니다.</Warning>}
      {isTermError && <Warning>약관에 동의하셔야 합니다.</Warning>}
    </>
  );
};

export default ErrorSection;
