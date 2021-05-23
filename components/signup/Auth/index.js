import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GoogleLogo from 'assets/svg/btn_google_light_normal_ios.svg';
import { emailRule } from '~/lib/regex';
import useInput from '~/hooks/useInput';
import { getVerifyEmailLoading } from '~/redux/selectors/signup';
import { landingEmailSelector } from '~/redux/selectors/landing';
import {
  verifyEmailRequest,
  verifySocialRequest,
} from '~/redux/reducers/signup';
import { saveEmail as saveLandingEmail } from '~/redux/reducers/landing';

import * as CS from '../common/styles';
import * as S from './style';

const Index = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail, setEmail] = useInput('');
  const [emailTestError, setEmailTestError] = useState(false);
  const verifyEmailLoading = useSelector(getVerifyEmailLoading);
  const landingEmail = useSelector(landingEmailSelector);

  useEffect(() => {
    // 랜딩에서 이메일 입력 후 버튼을 눌렀다면, 해당 이메일을 자동 입력
    if (landingEmail === null) return;

    setEmail(landingEmail);
    dispatch(saveLandingEmail(null));
  }, [landingEmail, setEmail, dispatch]);

  // useEffect(() => {
  //   if (localStorage.getItem('email') === ) {
  //     console.log('Email Auth is completed!!');
  //   }
  // }, [exEmail]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!emailRule.test(email)) {
        setEmailTestError(true);
        return;
      }
      dispatch(verifyEmailRequest(email));
    },
    [dispatch, email],
  );

  const onClickSocial = useCallback(() => {
    alert('미구현 기능입니다');
    // dispatch(verifySocialRequest());
  }, []);

  return (
    <CS.Container>
      {!verifyEmailLoading ? (
        <CS.Title>이메일을 입력하세요</CS.Title>
      ) : (
        <CS.Title>메일함을 확인하세요</CS.Title>
      )}
      {!verifyEmailLoading && (
        <CS.Form action="" onSubmit={onSubmit}>
          <CS.Input
            type="text"
            placeholder="example@gmail.com"
            value={email}
            page="auth"
            spellCheck="false"
            onChange={onChangeEmail}
          />
          {emailTestError && (
            <S.WarningText>정확한 이메일을 입력해주세요!</S.WarningText>
          )}
          <CS.SubmitButton type="submit" complete={false}>
            인증메일 발송
          </CS.SubmitButton>
        </CS.Form>
      )}
      {verifyEmailLoading && (
        <S.Description>
          {email}로 인증메일이 전송되었습니다. 메일함을 확인해주세요.
        </S.Description>
      )}
      <br />
      <S.Description>
        이메일 인증을 성공하면 회원가입을 계속 진행할 수 있습니다.
      </S.Description>
      <br />
      <S.Description>
        이미 계정이 있으신가요? 여기를 눌러 로그인하세요.
      </S.Description>
      {!verifyEmailLoading && (
        <S.SocialLoginWrapper>
          <S.SocialAnchor service="google" href="#" onClick={onClickSocial}>
            <GoogleLogo />
            <CS.Text>Sign up with Google</CS.Text>
          </S.SocialAnchor>
          <S.SocialAnchor service="github" href="##" onClick={onClickSocial}>
            <S.GithubImg
              src="assets/png/GitHub-Mark-Light-32px.png"
              alt="github-social-login"
            />
            <CS.Text>Sign up with Github</CS.Text>
          </S.SocialAnchor>
        </S.SocialLoginWrapper>
      )}
    </CS.Container>
  );
};

export default Index;
