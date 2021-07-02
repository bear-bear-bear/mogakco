import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Form from '@components/common/Form';
import Input from '@components/common/Input';
import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';

import * as CS from '@components/sign-up/common/styles';
import * as S from '@components/sign-up/Start/style';

export type FormInputs = {
  email: string | null;
};

const SignInForm = () => {
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const onClickEye = () => setIsVisiblePassword((prev) => !prev);

  const { getValues, setValue } = useForm<FormInputs>();

  return (
    <>
      <CS.Title>로그인</CS.Title>
      <S.SocialLoginWrapper>
        <S.SocialAnchor service="google" href="#">
          <S.GoogleIcon />
          <span>Google을 사용하여 로그인</span>
        </S.SocialAnchor>
        <S.SocialAnchor service="github" href="##">
          <S.GithunIcon />
          <span>Github을 사용하여 로그인</span>
        </S.SocialAnchor>
      </S.SocialLoginWrapper>
      <S.DevideLine />
      <Form action="">
        <InputWrapper>
          <Label htmlFor="email" direction="bottom">
            이메일
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="이메일 입력"
            scale="small"
            isEmail={Boolean(getValues('email'))}
            resetEmail={() => setValue('email', '')}
            spellCheck="false"
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password" direction="bottom">
            비밀번호
          </Label>
          <Input
            type="password"
            id="password"
            scale="small"
            onClickEye={onClickEye}
            isVisible={isVisiblePassword}
          />
        </InputWrapper>
        <S.SubmitButton type="submit" fullWidth $loading={loginLoading}>
          이메일로 로그인
        </S.SubmitButton>
      </Form>
    </>
  );
};

export default SignInForm;
