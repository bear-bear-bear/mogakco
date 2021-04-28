import React, { useCallback, useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import * as CS from '../common/styles';

import WarningText from './style';

import useInput from '~/hooks/useInput';
import { verifyInfoRequest } from '~/redux/actions/SignUp/info';

const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,}$/;

const Index = () => {
  const dispatch = useDispatch();
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordConfirm, onChangePasswordConfirm] = useInput('');
  const [initSubmit, setInitSubmit] = useState(false);
  const [term, setTerm] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordTestError, setPasswordTestError] = useState(false);
  const [termError, setTermError] = useState(false);

  useEffect(() => {
    // 처음 화면이 렌더링 됐을 땐 오류를 표시하지 않음
    if (initSubmit) {
      if (!term) {
        setTermError(true);
      } else {
        setTermError(false);
      }
      if (!passwordRule.test(password)) {
        setPasswordTestError(true);
      } else {
        setPasswordTestError(false);
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
      if (!passwordRule.test(password)) {
        setPasswordTestError(true);
        return;
      }
      if (password !== passwordConfirm) {
        setPasswordMatchError(true);
        return;
      }
      if (!term) {
        setTermError(true);
        return;
      }
      dispatch(verifyInfoRequest({ nickname, password }));
    },
    [dispatch, nickname, password, passwordConfirm, term],
  );

  return (
    <CS.Container>
      <CS.Title>별명과 비밀번호를 입력하세요</CS.Title>
      <CS.Form action="" onSubmit={onSubmit}>
        <CS.InputWrapper>
          <CS.Label htmlFor="nickname">별명</CS.Label>
          <CS.Input
            type="text"
            id="nickname"
            value={nickname}
            onChange={onChangeNickname}
            page="info"
            required
          />
        </CS.InputWrapper>
        <CS.InputWrapper>
          <CS.Label htmlFor="password">비밀번호</CS.Label>
          <CS.Input
            type="password"
            id="password"
            value={password}
            onChange={onChangePassword}
            page="info"
            required
          />
        </CS.InputWrapper>
        <CS.InputWrapper>
          <CS.Label htmlFor="passwordConfirm">비밀번호 확인</CS.Label>
          <CS.Input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
            page="info"
            required
          />
        </CS.InputWrapper>
        <WarningText>
          ※ 비밀번호는 8자리 이상의 대소문자와 숫자, 특수문자를 각 1개 이상을
          입력하셔야 합니다
        </WarningText>
        {passwordTestError && (
          <WarningText>형식에 맞는 비밀번호를 입력하세요!</WarningText>
        )}
        {passwordMatchError && (
          <WarningText>비밀번호가 일치하지 않습니다!</WarningText>
        )}
        <CS.InputWrapper page="info">
          <CS.Input
            type="checkbox"
            id="policy"
            page="info"
            value={term}
            onChange={onChangeTerm}
          />
          <CS.Label htmlFor="policy" page="info">
            (필수)개인정보 수집 및 이용에 동의하겠습니다.
          </CS.Label>
        </CS.InputWrapper>
        {termError && <WarningText>약관에 동의하셔야 합니다!</WarningText>}
        <CS.SubmitButton type="submit" complete={false}>
          계속
        </CS.SubmitButton>
      </CS.Form>
    </CS.Container>
  );
};

export default React.memo(Index);
