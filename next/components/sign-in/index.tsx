import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import useUser from '@hooks/useUser';
import Form from '@components/common/Form';
import Input from '@components/common/Input';
import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';
import devModeLog from '@lib/devModeLog';
import { signInApi } from '@lib/apis';
import { setToken } from '@lib/token';
import { isDevelopment } from '@lib/enviroment';
import type { ISignInProps } from 'typings/auth';
import type { GeneralAxiosError } from 'typings/common';

// TODO: 회원가입 컴포넌트 스타일 그대로 갖다쓰는데, 해당 스타일 공용화 시키기
import * as CS from '@components/sign-up/common/styles';
import * as S from '@components/sign-up/Start/style';
import { logAxiosError } from '@lib/apiClient';

export type FormInputs = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const { mutateUser } = useUser();
  const [signInLoading, setLoginLoading] = useState<boolean>(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const onClickEye = () => setIsVisiblePassword((prev) => !prev);
  const { watch, register, handleSubmit, setValue } = useForm<FormInputs>({
    defaultValues: {
      email: isDevelopment ? 'mogakco35@gmail.com' : '',
      password: isDevelopment ? 'mogapass' : '',
    },
  });

  const { email } = watch();

  const onClickSocial = () => {
    devModeLog('미구현 기능입니다');
  };

  const onSubmit = async (signInInfo: ISignInProps) => {
    setLoginLoading(true);

    try {
      const {
        data: { accessToken, expiration, ...generalServerResponseWithUser },
      } = await signInApi(signInInfo);
      mutateUser({
        ...generalServerResponseWithUser,
        isLoggedIn: true,
      });
      setToken({ accessToken, expiration });
    } catch (error) {
      logAxiosError(error as GeneralAxiosError);
    }

    setLoginLoading(false);
  };

  return (
    <>
      <CS.Title>로그인</CS.Title>
      <S.SocialLoginWrapper>
        <S.SocialAnchor service="google" href="#" onClick={onClickSocial}>
          <S.GoogleIcon />
          <span>Google을 사용하여 로그인</span>
        </S.SocialAnchor>
        <S.SocialAnchor service="github" href="##" onClick={onClickSocial}>
          <S.GithunIcon />
          <span>Github을 사용하여 로그인</span>
        </S.SocialAnchor>
      </S.SocialLoginWrapper>
      <S.DevideLine />
      <Form action="" onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Label htmlFor="email" direction="bottom">
            이메일
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="이메일 입력"
            scale="small"
            isEmail={Boolean(email)}
            resetEmail={() => setValue('email', '')}
            spellCheck="false"
            {...register('email', { required: true })}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password" direction="bottom">
            비밀번호
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="비밀번호 입력"
            scale="small"
            onClickEye={onClickEye}
            isVisible={isVisiblePassword}
            {...register('password', { required: true })}
          />
        </InputWrapper>
        <CS.SubmitButton type="submit" fullWidth $loading={signInLoading}>
          이메일로 로그인
        </CS.SubmitButton>
      </Form>
    </>
  );
};

export default SignInForm;
