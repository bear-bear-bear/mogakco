import React, { useState, useLayoutEffect, useRef } from 'react';
import log from 'loglevel';

import { UnpackNestedValue, useForm } from 'react-hook-form';
import { emailRule } from '~/lib/regex';
import { sendEmailRequest } from '~/redux/reducers/signup';
import Warning from '~/components/common/Warning';
import Desc from '~/components/common/Desc';
import Form from '~/components/common/Form';
import Input from '~/components/common/Input';
import InputWrapper from '~/components/common/InputWrapper';
import Label from '~/components/common/Label';

import * as CS from '../common/styles';
import * as S from './style';
import useTypedSelector from '~/hooks/useTypedSelector';
import useTypedDispatch from '~/hooks/useTypedDispatch';
import useEffectSignUpStart from '~/components/signup/Start/useEffectSignUpStart';

export type FormInputs = {
  email: string | null;
};

const Auth = () => {
  const dispatch = useTypedDispatch();
  const [emailTestError, setEmailTestError] = useState(false);
  const sendEmailLoading = useTypedSelector(
    ({ signup }) => signup.sendEmailLoading,
  );
  const sendEmailDone = useTypedSelector(({ signup }) => signup.sendEmailDone);
  const submitButtonEl = useRef<HTMLButtonElement>(null);

  const { register, handleSubmit, setValue, getValues } = useForm<FormInputs>();

  const onSubmitEmail = ({ email }: UnpackNestedValue<FormInputs>) => {
    setEmailTestError(false);
    dispatch(sendEmailRequest(email as string));
  };
  const onError = () => setEmailTestError(true);

  const onClickSocial = () => {
    log.setLevel('debug');
    log.warn('미구현 기능입니다.');
    // dispatch(verifySocialRequest());
  };

  useLayoutEffect(() => {
    submitButtonEl.current?.focus();
  }, [submitButtonEl]);

  useEffectSignUpStart(setValue);

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
              loading={sendEmailLoading}
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
