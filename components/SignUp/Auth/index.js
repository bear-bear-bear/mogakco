import React, { useCallback } from 'react';
import GoogleLogo from 'assets/svg/btn_google_light_normal_ios.svg';
import { useDispatch } from 'react-redux';
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
} from '~/redux/actions/signup/auth';
import useInput from '~/hooks/useInput';

const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const Index = () => {
  const [email, onChangeEmail, setEmail] = useInput(' ');
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (!emailRule.test(email)) {
        setEmail('');
        return;
      }
      dispatch(verifyEmailRequest(email));
    },
    [dispatch, email, setEmail],
  );

  const onClickSocial = useCallback(() => {
    dispatch(verifySocialRequest());
  }, [dispatch]);

  return (
    <Container>
      <Title>이메일을 입력하세요</Title>
      <Form action="" onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="example@gmail.com"
          value={email}
          page="auth"
          onChange={onChangeEmail}
        />
        {!email && <WarningText>정확한 이메일을 입력해주세요!</WarningText>}
        <SubmitButton type="submit" complete={false}>
          인증메일 발송
        </SubmitButton>
      </Form>
      <Description>
        이메일 인증을 성공하면 회원가입을 계속 진행할 수 있습니다.
      </Description>
      <br />
      <Description>
        이미 계정이 있으신가요? 여기를 눌러 로그인하세요.
      </Description>
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
    </Container>
  );
};

export default React.memo(Index);
