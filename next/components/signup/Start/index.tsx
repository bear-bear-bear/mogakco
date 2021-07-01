import React, { useState, useRef, useEffect } from 'react';
import { UnpackNestedValue, useForm } from 'react-hook-form';

import { signupAPIs } from '@lib/APIs';
import { logAxiosError } from '@lib/apiClient';
import useLanding from '@hooks/useLanding';
import useDebugLog from '@hooks/useDebugLog';
import useIsomorphicLayoutEffect from '@hooks/useIsomorphicLayoutEffect';
import { emailRule } from '@lib/regex';
import Warning from '@components/common/Warning';
import Desc from '@components/common/Desc';
import Form from '@components/common/Form';
import Input from '@components/common/Input';
import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';

import * as CS from '../common/styles';
import * as S from './style';

export type FormInputs = {
  email: string | null;
};

const { sendEmailAPI } = signupAPIs;

const Auth = () => {
  const { email: landingEmail, updateLanding } = useLanding();
  const [sendEmailState, setSendEmailState] = useState({
    loading: false,
    done: false,
  });
  const [emailTestError, setEmailTestError] = useState(false);
  const submitButtonEl = useRef<HTMLButtonElement>(null);
  const { register, handleSubmit, setValue, getValues } = useForm<FormInputs>();
  const debugLog = useDebugLog();

  const onSubmitEmail = ({ email }: UnpackNestedValue<FormInputs>) => {
    setEmailTestError(false);

    if (email === null) {
      return;
    }

    setSendEmailState({
      loading: true,
      done: false,
    });

    sendEmailAPI(email)
      .then(() => {
        setSendEmailState({
          loading: false,
          done: true,
        });
      })
      .catch((err) => {
        setSendEmailState({
          loading: false,
          done: false,
        });
        logAxiosError(err);
      });
  };

  const onError = () => setEmailTestError(true);

  const onClickSocial = () => {
    debugLog('미구현 기능입니다.');
  };

  useIsomorphicLayoutEffect(() => {
    submitButtonEl.current?.focus();
  }, [submitButtonEl]);

  useEffect(() => {
    // 랜딩페이지에서 이메일 입력으로 회원가입 페이지로 넘어왔다면
    // 이메일 입력창에 랜딩페이지에서 입력한 이메일을 자동 입력
    if (landingEmail === null) return;

    setValue('email', landingEmail);

    // 자동 입력 후 랜딩페이지 이메일 상태 초기화
    updateLanding({
      email: null,
    });
  }, [landingEmail, setValue, updateLanding]);

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
          <Form action="" onSubmit={handleSubmit(onSubmitEmail, onError)}>
            <InputWrapper>
              <Label direction="bottom">이메일</Label>
              <Input
                type="email"
                placeholder="이메일 입력"
                scale="medium"
                setValue={setValue}
                spellCheck="false"
                {...register('email', { pattern: emailRule })}
              />
            </InputWrapper>
            {emailTestError && <Warning>정확한 이메일을 입력해주세요!</Warning>}
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

export default Auth;
