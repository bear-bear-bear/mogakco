import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/Router';

import GoogleLogo from 'assets/svg/btn_google_light_normal_ios.svg';
import { emailRule } from '~/lib/regex';
import { sendEmailRequest, verifyEmailRequest } from '~/redux/reducers/signup';
import { saveEmail as saveLandingEmail } from '~/redux/reducers/landing';
import Warning from '~/components/common/Warning';
import Desc from '~/components/common/Desc';
import Form from '~/components/common/Form';
import InputBox from '~/components/common/InputBox';

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
    alert('미구현 기능입니다');
    // dispatch(verifySocialRequest());
  };

  return (
    <>
      {!sendEmailDone ? (
        <>
          <CS.Title>회원가입</CS.Title>
          <CS.SubTitle>이메일을 입력하세요</CS.SubTitle>
        </>
      ) : (
        <CS.Title>메일함을 확인하세요</CS.Title>
      )}
      {!sendEmailDone && (
        <Form action="" onSubmit={onSubmitEmail}>
          <InputBox
            type="text"
            placeholder="이메일 입력"
            ref={emailEl}
            size="medium"
            spellCheck="false"
          />
          {emailTestError && <Warning>정확한 이메일을 입력해주세요!</Warning>}
          <CS.SubmitButton
            ref={submitButtonEl}
            type="submit"
            complete={false}
            loading={sendEmailLoading}
          >
            인증메일 발송
          </CS.SubmitButton>
        </Form>
      )}
      {sendEmailDone && (
        <>
          <Desc>
            <b>{emailEl.current.value}</b>로 인증 링크가 전송되었습니다.
            메일함을 확인해주세요.
          </Desc>
        </>
      )}
      {!sendEmailDone && (
        <>
          <Desc>
            이메일 인증을 성공하면 회원가입을 계속 진행할 수 있습니다.
          </Desc>
          <Desc>
            이미 계정이 있으신가요?{' '}
            <Link href="/signin">
              <a>여기</a>
            </Link>
            를 눌러 로그인하세요.
          </Desc>
          <S.SocialLoginWrapper>
            <S.SocialAnchor service="google" href="#" onClick={onClickSocial}>
              <GoogleLogo />
              <span>Sign up with Google</span>
            </S.SocialAnchor>
            <S.SocialAnchor service="github" href="##" onClick={onClickSocial}>
              <S.GithubImg
                src="assets/png/GitHub-Mark-Light-32px.png"
                alt="github-social-login"
              />
              <span>Sign up with Github</span>
            </S.SocialAnchor>
          </S.SocialLoginWrapper>
        </>
      )}
    </>
  );
};

export default Auth;
