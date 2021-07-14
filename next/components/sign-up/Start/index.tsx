import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { sendEmailApi } from '@lib/apis';
import { logAxiosError } from '@lib/apiClient';
import type { Error } from '@lib/apiClient';
import devModeLog from '@lib/devModeLog';
import useIsomorphicLayoutEffect from '@hooks/useIsomorphicLayoutEffect';
import { emailRule } from '@lib/regex';
import Desc from '@components/common/Desc';
import Form from '@components/common/Form';
import Input from '@components/common/Input';
import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';

import * as CS from '../common/styles';
import * as S from './style';

export type FormInputs = {
  email: string;
};

const Start = () => {
  const router = useRouter();
  const [sendEmailState, setSendEmailState] = useState({
    loading: false,
    done: false,
  });
  const submitButtonEl = useRef<HTMLButtonElement>(null);
  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<FormInputs>();

  const { email: watchedEmail } = watch(); // 이메일 Input 컴포넌트의 X 버튼을 위한 watch

  const onSubmitEmail = async ({ email }: FormInputs) => {
    setSendEmailState({
      loading: true,
      done: false,
    });

    try {
      await sendEmailApi(email);
      setSendEmailState({
        loading: false,
        done: true,
      });
    } catch (error) {
      logAxiosError(error as Error);
      setSendEmailState({
        loading: false,
        done: false,
      });
    }
  };

  const onClickSocial = () => {
    devModeLog('미구현 기능입니다.');
  };

  useIsomorphicLayoutEffect(() => {
    submitButtonEl.current?.focus();
  }, [submitButtonEl]);

  useEffect(() => {
    const { email: landingEmail } = router.query;

    if (landingEmail) {
      setValue('email', landingEmail as string);
      router.push('/sign-up', undefined, { shallow: true });
    }
  }, [router, setValue]);

  return (
    <>
      {!sendEmailState.done && (
        <>
          <CS.Title>회원가입</CS.Title>
          <S.SocialLoginWrapper>
            <S.SocialAnchor service="google" href="#" onClick={onClickSocial}>
              <S.GoogleIcon />
              <span>Google로 계속하기</span>
            </S.SocialAnchor>
            <S.SocialAnchor service="github" href="##" onClick={onClickSocial}>
              <S.GithunIcon />
              <span>Github으로 계속하기</span>
            </S.SocialAnchor>
          </S.SocialLoginWrapper>
          <S.DevideLine />
          <Form action="" onSubmit={handleSubmit(onSubmitEmail)}>
            <InputWrapper>
              <Label htmlFor="email" direction="bottom">
                이메일
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="이메일 입력"
                scale="medium"
                isEmail={Boolean(watchedEmail)}
                resetEmail={() => setValue('email', '')}
                spellCheck="false"
                {...register('email', {
                  pattern: emailRule,
                  required: true,
                })}
              />
            </InputWrapper>
            <S.SubmitButton
              ref={submitButtonEl}
              type="submit"
              fullWidth
              $loading={sendEmailState.loading}
            >
              이메일로 계속하기
            </S.SubmitButton>
          </Form>
        </>
      )}

      {sendEmailState.done && (
        <>
          <CS.Title>메일함을 확인하세요</CS.Title>
          <Desc>
            <b>{getValues('email')}</b>로 인증 링크가 전송되었습니다. 메일함을
            확인해주세요.
          </Desc>
        </>
      )}
    </>
  );
};

export default Start;
