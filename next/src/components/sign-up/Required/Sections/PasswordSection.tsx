import React, { useRef, useState } from 'react';
import {
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
} from 'react-hook-form';

import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';
import Input from '@components/common/Input';
import { passwordRule } from '@lib/regex';

import type { InputValues } from '../typings';

type Props = {
  register: UseFormRegister<InputValues>;
  setError: UseFormSetError<InputValues>;
  clearErrors: UseFormClearErrors<InputValues>;
};

const PasswordSection = ({ register, setError, clearErrors }: Props) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const onClickEye = () => setIsVisiblePassword((prev) => !prev);

  const passwordEl = useRef<HTMLInputElement | null>(null);
  const passwordConfirmEl = useRef<HTMLInputElement | null>(null);

  // ref를 사용하기 위해 register들을 수동 정의
  // https://react-hook-form.com/api/useform/register#registerRef
  const { ref: pwRef, ...pwRest } = register('password', {
    pattern: {
      value: passwordRule,
      message: '형식에 맞는 비밀번호를 입력하세요.',
    },
    validate: {
      confirm: (v) => {
        const isPasswordConfirm = v === passwordConfirmEl.current?.value;
        if (isPasswordConfirm) {
          clearErrors('passwordConfirm');
        }
        if (!isPasswordConfirm) {
          setError('passwordConfirm', {
            type: 'validate',
            message: '비밀번호가 일치하지 않습니다.',
          });
        }
        return true; // 무조건 true를 반환하여 errors.password에는 passwordConfirm관련 에러가 세팅되지 않음
      },
    },
    required: '비밀번호란을 입력해주세요',
  });
  const { ref: pwcRef, ...pwcRest } = register('passwordConfirm', {
    validate: {
      confirm: (v) =>
        v === passwordEl.current?.value || '비밀번호가 일치하지 않습니다.',
    },
    required: '비밀번호 확인란를 입력해주세요',
  });

  return (
    <>
      <InputWrapper>
        <Label htmlFor="password" direction="bottom">
          * 비밀번호
        </Label>
        <Input
          type="password"
          id="password"
          scale="small"
          onClickEye={onClickEye}
          isVisible={isVisiblePassword}
          required
          {...pwRest}
          ref={(e) => {
            pwRef(e);
            passwordEl.current = e;
          }}
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
          {...pwcRest}
          ref={(e) => {
            pwcRef(e);
            passwordConfirmEl.current = e;
          }}
        />
      </InputWrapper>
    </>
  );
};

export default PasswordSection;
