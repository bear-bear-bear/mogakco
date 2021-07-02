import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { UnpackNestedValue, useForm } from 'react-hook-form';

import type { ILoginProps } from 'typings/auth';
import Form from '@components/common/Form';
import Input from '@components/common/Input';
import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';
import useDebugLog from '@hooks/useDebugLog';
import { logInFetcher } from '@lib/fetchers';
import { logAxiosError } from '@lib/apiClient';
import { isDevelopment } from '@lib/enviroment';

// TODO: 회원가입 컴포넌트 스타일 그대로 갖다쓰는데, 해당 스타일 공용화 시키기
import * as CS from '@components/sign-up/common/styles';
import * as S from '@components/sign-up/Start/style';

export type FormInputs = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const router = useRouter();
  const [signInLoading, setLoginLoading] = useState<boolean>(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const onClickEye = () => setIsVisiblePassword((prev) => !prev);
  const debugLog = useDebugLog();
  const { watch, register, handleSubmit, setValue } = useForm<FormInputs>();

  const { email } = watch();

  const onClickSocial = () => {
    debugLog('미구현 기능입니다');
  };

  const onSubmit = (signInInfo: UnpackNestedValue<FormInputs>) => {
    setLoginLoading(true);
    logInFetcher(signInInfo)
      .then(() => {
        // TODO: 서비스 페이지로 이동하기
        debugLog('로그인 성공 응답');
        debugLog('서비스 페이지 미구현 상태이므로 임시 경로(/)로 이동합니다');
        setLoginLoading(false);
        router.push('/');
      })
      .catch((err) => {
        setLoginLoading(false);
        logAxiosError(err);
      });
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
            defaultValue={isDevelopment ? 'mogakco35@gmail.com' : undefined}
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
            defaultValue={isDevelopment ? 'mogapass' : undefined}
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
