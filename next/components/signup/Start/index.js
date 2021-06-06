import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import log from 'loglevel';

import { emailRule } from '~/lib/regex';
import { sendEmailRequest, verifyEmailRequest } from '~/redux/reducers/signup';
import { saveEmail as saveLandingEmail } from '~/redux/reducers/landing';
import Warning from '~/components/common/Warning';
import Desc from '~/components/common/Desc';
import Form from '~/components/common/Form';
import TextInput from '~/components/common/Input/TextInput';
import InputWrapper from '~/components/common/InputWrapper';
import Label from '~/components/common/Label';

import * as CS from '../common/styles';
import * as S from './style';

const Auth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [emailTestError, setEmailTestError] = useState(false);
  const sendEmailLoading = useSelector(({ signup }) => signup.sendEmailLoading);
  const sendEmailDone = useSelector(({ signup }) => signup.sendEmailDone);
  const landingEmail = useSelector(({ landing }) => landing.email);
  const emailEl = useRef(null);
  const submitButtonEl = useRef(null);

  useEffect(() => {
    submitButtonEl.current.focus();
  }, []);

  useEffect(() => {
    // 랜딩에서 이메일 입력 후 버튼을 눌렀다면, 해당 이메일을 자동 입력
    if (landingEmail === null) return;

    emailEl.current.value = landingEmail;
    dispatch(saveLandingEmail(null));
  }, [landingEmail, dispatch]);

  useEffect(() => {
    const { success, email } = router.query;

    const isQuery = Boolean(success);
    if (!isQuery) {
      return;
    }

    if (success === 'true') {
      dispatch(verifyEmailRequest(email));
    }
    router.push('/signup', undefined, { shallow: true });
  }, [dispatch, router]);

  const onSubmitEmail = useCallback(
    (e) => {
      e.preventDefault();
      const email = emailEl.current.value;
      if (!emailRule.test(email)) {
        setEmailTestError(true);
        return;
      }
      dispatch(sendEmailRequest(email));
    },
    [dispatch],
  );

  const onClickSocial = () => {
    log.setLevel('debug');
    log.warn('미구현 기능입니다.');
    // dispatch(verifySocialRequest());
  };

  return (
    <>
      {!sendEmailDone ? (
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
              <TextInput
                type="text"
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
      ) : (
        <>
          <CS.Title>메일함을 확인하세요</CS.Title>
          <Desc>
            <b>{emailEl.current.value}</b>로 인증 링크가 전송되었습니다.
            메일함을 확인해주세요.
          </Desc>
        </>
      )}
    </>
  );
};

export default Auth;
