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

  // ref, onChange를 사용하기 위해 register들을 수동 정의
  // https://react-hook-form.com/api/useform/register#registerRef
  const {
    ref: pwRef,
    onChange: onChangePw,
    ...pwRest
  } = register('password', {
    pattern: {
      value: passwordRule,
      message: '형식에 맞는 비밀번호를 입력하세요.',
    },
    required: '비밀번호란을 입력해주세요',
  });
  const {
    ref: pwcRef,
    onChange: onChangePwc,
    ...pwcRest
  } = register('passwordConfirm', {
    required: '비밀번호 확인란를 입력해주세요',
  });

  // 패스워드 불일치 판단은 react-hook-form을 사용하면 동작 상 약간의 오류가 있어
  // onChnage를 통해 error를 on/off 하는 방식으로 동작합니다.
  const handleChange = () => {
    // 타입 가드
    if (passwordEl.current === null || passwordConfirmEl.current === null) {
      return;
    }

    const currPassword = passwordEl.current.value;
    const currPasswordConfirm = passwordConfirmEl.current.value;

    // 비밀번호가 같을 시 passwordConfirm 에러 off
    if (currPassword === currPasswordConfirm) {
      clearErrors('passwordConfirm');
    }

    // 비밀번호 확인란의 값이 비었다면 에러를 띄우지 않음
    if (currPasswordConfirm === '') {
      return;
    }

    // 비밀번호가 다를 시 passwordConfirm 에러 on
    if (currPassword !== currPasswordConfirm) {
      setError('passwordConfirm', {
        type: 'validate',
        message: '패스워드가 일치하지 않습니다.',
      });
    }
  };

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
          onChange={(e) => {
            onChangePw(e); // method from hook form register
            handleChange(); // my method
          }}
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
          onChange={(e) => {
            onChangePwc(e); // method from hook form register
            handleChange(); // my method
          }}
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
