import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormInputs } from '~/components/signup/RequiredInfo';
import InputWrapper from '~/components/common/InputWrapper';
import Label from '~/components/common/Label';
import PasswordInput from '~/components/common/Input/PasswordInput';
import { passwordRule } from '~/lib/regex';

type Props = {
  register: UseFormRegister<FormInputs>;
  password: string;
  flipIsTypingPassword: () => void;
};

const PasswordForm = ({ register, flipIsTypingPassword, password }: Props) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const onClickEye = () => setIsVisiblePassword((prev) => !prev);

  return (
    <>
      <InputWrapper>
        <Label htmlFor="password" direction="bottom">
          * 비밀번호
        </Label>
        <PasswordInput
          {...register('password', {
            pattern: passwordRule,
            minLength: 8,
          })}
          type="password"
          id="password"
          onFocus={flipIsTypingPassword}
          onBlur={flipIsTypingPassword}
          scale="small"
          onClickEye={onClickEye}
          isVisible={isVisiblePassword}
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="passwordConfirm" direction="bottom">
          * 비밀번호 확인
        </Label>
        <PasswordInput
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

export default PasswordForm;
