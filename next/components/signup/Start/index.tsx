import React, { useState, useEffect, useRef, SyntheticEvent } from 'react';
import log from 'loglevel';

import useInput from '~/hooks/useInput';
import { emailRule } from '~/lib/regex';
import { sendEmailRequest } from '~/redux/reducers/signup';
import Warning from '~/components/common/Warning';
import Desc from '~/components/common/Desc';
import Form from '~/components/common/Form';
import EmailInput from '~/components/common/Input/EmailInput';
import InputWrapper from '~/components/common/InputWrapper';
import Label from '~/components/common/Label';

import * as CS from '../common/styles';
import * as S from './style';
import useTypedSelector from '~/hooks/useTypedSelector';
import useTypedDispatch from '~/hooks/useTypedDispatch';
import useEffectSignUpStart from '~/components/signup/Start/useEffectSignUpStart';

const Auth = () => {
  const dispatch = useTypedDispatch();
  const [email, onChangeEmail, setEmail] = useInput();
  const [emailTestError, setEmailTestError] = useState(false);
  const sendEmailLoading = useTypedSelector(
    ({ signup }) => signup.sendEmailLoading,
  );
  const sendEmailDone = useTypedSelector(({ signup }) => signup.sendEmailDone);
  const emailEl = useRef(null);
  const submitButtonEl = useRef(null);

  // TODO: Type 수정 예정 writen by galaxy4276
  const onSubmitEmail = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!emailRule.test(email as string)) {
      setEmailTestError(true);
      return;
    }

    dispatch(sendEmailRequest(email));
  };

  const onClickSocial = () => {
    log.setLevel('debug');
    log.warn('미구현 기능입니다.');
    // dispatch(verifySocialRequest());
  };

  useEffect(() => {
    submitButtonEl.current.focus();
  }, []);

  useEffectSignUpStart(setEmail);

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
          <Form action="" onSubmit={onSubmitEmail}>
            <InputWrapper>
              <Label direction="bottom">이메일</Label>
              <EmailInput
                type="email"
                value={email}
                setValue={setEmail}
                onChange={onChangeEmail}
                placeholder="이메일 입력"
                ref={emailEl}
                size="medium"
                spellCheck="false"
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
            <b>{email}</b>로 인증 링크가 전송되었습니다. 메일함을 확인해주세요.
          </Desc>
        </>
      )}
    </>
  );
};

export default Auth;
