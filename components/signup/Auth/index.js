import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import GoogleLogo from 'assets/svg/btn_google_light_normal_ios.svg';
import { emailRule } from '~/lib/regex';
import { getVerifyEmailLoading } from '~/redux/selectors/signup';
import { landingEmailSelector } from '~/redux/selectors/landing';
import { verifyEmailRequest } from '~/redux/reducers/signup';
import { saveEmail as saveLandingEmail } from '~/redux/reducers/landing';

import * as CS from '../common/styles';
import * as S from './style';

const Index = () => {
  const dispatch = useDispatch();
  const [emailTestError, setEmailTestError] = useState(false);
  const verifyEmailLoading = useSelector(getVerifyEmailLoading);
  const landingEmail = useSelector(landingEmailSelector);
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

  // useEffect(() => {
  //   if (localStorage.getItem('email') === ) {
  //     console.log('Email Auth is completed!!');
  //   }
  // }, [exEmail]);

  const onSubmitEmail = useCallback(
    (e) => {
      e.preventDefault();
      const email = emailEl.current.value;
      if (!emailRule.test(email)) {
        setEmailTestError(true);
        return;
      }
      dispatch(verifyEmailRequest(email));
    },
    [dispatch],
  );

  const onClickSocial = () => {
    alert('미구현 기능입니다');
    // dispatch(verifySocialRequest());
  };

  return (
    <CS.Container>
      {!verifyEmailLoading ? (
        <>
          <CS.Title>회원가입</CS.Title>
          <CS.SubTitle>이메일을 입력하세요</CS.SubTitle>
        </>
      ) : (
        <CS.Title>메일함을 확인하세요</CS.Title>
      )}
      {!verifyEmailLoading && (
        <CS.Form action="" onSubmit={onSubmitEmail}>
          <CS.Input
            type="text"
            placeholder="이메일 입력"
            ref={emailEl}
            size="medium"
            spellCheck="false"
          />
          {emailTestError && (
            <CS.WarningText>정확한 이메일을 입력해주세요!</CS.WarningText>
          )}
          <CS.SubmitButton ref={submitButtonEl} type="submit" complete={false}>
            인증메일 발송
          </CS.SubmitButton>
        </CS.Form>
      )}
      {verifyEmailLoading && (
        <>
          <CS.Description>
            <b>{emailEl.current.value}</b>로 인증 링크가 전송되었습니다.
            메일함을 확인해주세요.
          </CS.Description>
        </>
      )}
      {!verifyEmailLoading && (
        <>
          <CS.Description>
            이메일 인증을 성공하면 회원가입을 계속 진행할 수 있습니다.
          </CS.Description>
          <CS.Description>
            이미 계정이 있으신가요?{' '}
            <Link href="/signin">
              <a>여기</a>
            </Link>
            를 눌러 로그인하세요.
          </CS.Description>
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
    </CS.Container>
  );
};

export default Index;
