import React, { useCallback, useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import {
  Container,
  Title,
  Form,
  InputWrapper,
  Label,
  Input,
  SubmitButton,
} from '../common/styles';

import { WarningText } from './style';

import useInput from '~/hooks/useInput';
import { verifyInfoRequest } from '~/redux/actions/signup/info';

const Index = () => {
  const dispatch = useDispatch();
  const [username, onChangeUserName, setuserName] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [
    passwordConfirm,
    onChangePasswordConfirm,
    setPasswordConfirm,
  ] = useInput('');
  const [initSubmit, setInitSubmit] = useState(false);
  const [term, setTerm] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [termError, setTermError] = useState(false);

  useEffect(() => {
    // 처음 화면이 렌더링 됐을 땐 오류를 표시하지 않음
    if (initSubmit) {
      if (!term) {
        setTermError(true);
      } else {
        setTermError(false);
      }
      if (password !== passwordConfirm) {
        setPasswordMatchError(true);
      } else {
        setPasswordMatchError(false);
      }
    }
  }, [password, passwordConfirm, term, initSubmit]);

  const onChangeTerm = useCallback(() => {
    setTerm(!term);
  }, [term]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      setInitSubmit(true);
      if (password !== passwordConfirm) {
        setPasswordMatchError(true);
        return;
      }
      if (!term) {
        setTermError(true);
        return;
      }
      dispatch(verifyInfoRequest(username, password));
      setuserName('');
      setPassword('');
      setPasswordConfirm('');
    },
    [
      dispatch,
      username,
      password,
      passwordConfirm,
      term,
      setuserName,
      setPassword,
      setPasswordConfirm,
    ],
  );

  return (
    <Container>
      <Title>별명과 비밀번호를 입력하세요</Title>
      <Form action="" onSubmit={onSubmit}>
        <InputWrapper>
          <Label htmlFor="username">별명</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={onChangeUserName}
            page="info"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={onChangePassword}
            page="info"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
          <Input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
            page="info"
            required
          />
        </InputWrapper>
        <WarningText>※ 비밀번호는 8자리 이상 입력하셔야 합니다</WarningText>
        {passwordMatchError && (
          <WarningText>비밀번호가 일치하지 않습니다!</WarningText>
        )}
        <InputWrapper page="info">
          <Input
            type="checkbox"
            id="policy"
            page="info"
            value={term}
            onChange={onChangeTerm}
          />
          <Label htmlFor="policy" page="info">
            (필수)개인정보 수집 및 이용에 동의하겠습니다.
          </Label>
        </InputWrapper>
        {termError && <WarningText>약관에 동의하셔야 합니다!</WarningText>}
        <SubmitButton type="submit" complete={false}>
          계속
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default React.memo(Index);
