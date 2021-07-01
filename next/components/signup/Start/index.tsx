import React, { useState, useRef, useEffect } from 'react';
import log from 'loglevel';
import { UnpackNestedValue, useForm } from 'react-hook-form';

import { signupAPIs } from '@lib/APIs';
import useLanding from '@hooks/useLanding';
import useIsomorphicLayoutEffect from '~/hooks/useIsomorphicLayoutEffect';
import { emailRule } from '~/lib/regex';
import Warning from '~/components/common/Warning';
import Desc from '~/components/common/Desc';
import Form from '~/components/common/Form';
import Input from '~/components/common/Input';
import InputWrapper from '~/components/common/InputWrapper';
import Label from '~/components/common/Label';

import * as CS from '../common/styles';
import * as S from './style';

export type FormInputs = {
  email: string | null;
};

const { sendEmailAPI } = signupAPIs;

const Auth = () => {
  const { email: landingEmail, updateLanding } = useLanding();
  const [sendEmailDone, setSendEmailDone] = useState(false);
  const [sendEmailLoading, setSendEmailLoading] = useState(false);
  const [emailTestError, setEmailTestError] = useState(false);
  const submitButtonEl = useRef<HTMLButtonElement>(null);
  const { register, handleSubmit, setValue, getValues } = useForm<FormInputs>();

  const onSubmitEmail = ({ email }: UnpackNestedValue<FormInputs>) => {
    setSendEmailLoading(true);
    setEmailTestError(false);
    if (email === null) {
      return;
    }

    sendEmailAPI(email)
      .then(() => {
        setSendEmailDone(true);
        setSendEmailLoading(false);
      })
      .catch(() => setSendEmailLoading(false));
  };

  const onError = () => setEmailTestError(true);

  const onClickSocial = () => {
    log.setLevel('debug');
    log.warn('미구현 기능입니다.');
  };

  useIsomorphicLayoutEffect(() => {
    submitButtonEl.current?.focus();
  }, [submitButtonEl]);

  useEffect(() => {
    if (landingEmail === null) return;

    setValue('email', landingEmail);
    updateLanding({
      email: landingEmail,
    });
  }, [landingEmail, setValue, updateLanding]);

  return (
    <>
      {!sendEmailDone && (
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
              $loading={sendEmailLoading}
            >
              이메일로 계속하기
            </S.SubmitButton>
          </Form>
        </>
      )}

      {sendEmailDone && (
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
