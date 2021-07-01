import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';
import Input from '@components/common/Input';
import { passwordRule } from '@lib/regex';

import type { InputValues } from '../typings';

type Props = {
  register: UseFormRegister<InputValues>;
  password: string;
};

const PasswordSection = ({ register, password }: Props) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const onClickEye = () => setIsVisiblePassword((prev) => !prev);

  return (
    <>
      <InputWrapper>
        <Label htmlFor="password" direction="bottom">
          * 비밀번호
        </Label>
        <Input
          {...register('password', {
            pattern: passwordRule,
            minLength: 8,
          })}
          type="password"
          id="password"
          scale="small"
          onClickEye={onClickEye}
          isVisible={isVisiblePassword}
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="passwordConfirm" direction="bottom">
          * 비밀번호 확인
        </Label>
        <Input
          type="password"
          id="passwordConfirm"
          scale="small"
          onClickEye={onClickEye}
          isVisible={isVisiblePassword}
          required
          {...register('passwordConfirm', {
            validate: (value) => value === password,
          })}
        />
      </InputWrapper>
    </>
  );
};

export default PasswordSection;
