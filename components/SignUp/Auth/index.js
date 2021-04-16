import React, { useCallback, useState } from 'react';
import GoogleLogo from 'assets/svg/btn_google_light_normal_ios.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  Description,
  SocialLoginWrapper,
  SocialAnchor,
  GithubImg,
  WarningText,
} from './style';

import {
  Container,
  Title,
  SubmitButton,
  Form,
  Input,
  Text,
} from '../common/styles';

import {
  verifyEmailRequest,
  verifySocialRequest,
} from '~/redux/actions/SignUp/auth';
import useInput from '~/hooks/useInput';
import { getVerifyEmailLoading } from '~/redux/selectors/SignUp';

const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const Index = () => {
  const [email, onChangeEmail] = useInput('');
  const [emailTestError, setEmailTestError] = useState(false);
  const dispatch = useDispatch();
  const verifyEmailLoading = useSelector(getVerifyEmailLoading);

  const onSubmit = useCallback(
    e => {
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
    dispatch(verifySocialRequest());
  }, [dispatch]);

  return (
    <Container>
      {!verifyEmailLoading ? (
        <Title>이메일을 입력하세요</Title>
      ) : (
        <Title>메일함을 확인하세요</Title>
      )}
      {!verifyEmailLoading && (
        <Form action="" onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="example@gmail.com"
            value={email}
            page="auth"
            onChange={onChangeEmail}
          />
          {emailTestError && (
            <WarningText>정확한 이메일을 입력해주세요!</WarningText>
          )}
          <SubmitButton type="submit" complete={false}>
            인증메일 발송
          </SubmitButton>
        </Form>
      )}
      {verifyEmailLoading && (
        <Description>
          {email}로 인증메일이 전송되었습니다. 메일함을 확인해주세요.
        </Description>
      )}
      <br />
      <Description>
        이메일 인증을 성공하면 회원가입을 계속 진행할 수 있습니다.
      </Description>
      <br />
      <Description>
        이미 계정이 있으신가요? 여기를 눌러 로그인하세요.
      </Description>
      {!verifyEmailLoading && (
        <SocialLoginWrapper>
          <SocialAnchor service="google" href="#" onClick={onClickSocial}>
            <GoogleLogo />
            <Text>Sign up with Google</Text>
          </SocialAnchor>
          <SocialAnchor service="github" href="##" onClick={onClickSocial}>
            <GithubImg
              src="assets/images/GitHub-Mark-Light-32px.png"
              alt="github-social-login"
            />
            <Text>Sign up with Github</Text>
          </SocialAnchor>
        </SocialLoginWrapper>
      )}
    </Container>
  );
};

export default React.memo(Index);
