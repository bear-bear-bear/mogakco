import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useInput from '~/hooks/useInput';
import { verifyInfoRequest } from '~/redux/reducers/signup';
import { passwordRule } from '~/lib/regex';

import * as CS from '../common/styles';
import * as S from './style';

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

  const verifyInputs = useCallback(() => {
    // input 모두 검증 후 전체 테스트 통과여부 반환
    const isTermError = term === false;
    setTermError(isTermError);

    const isPasswordTestError = passwordRule.test(password) === false;
    setPasswordTestError(isPasswordTestError);

    const isPasswordMatchError = password !== passwordConfirm;
    setPasswordMatchError(isPasswordMatchError);

    return [isTermError, isPasswordTestError, isPasswordMatchError].every(
      (isError) => isError === false,
    );
  }, [term, password, passwordConfirm]);

  useEffect(() => {
    // 처음 화면이 렌더링 됐을 땐 오류를 표시하지 않음
    if (!initSubmit) return;
    verifyInputs();
  }, [verifyInputs, initSubmit]);

  const onChangeTerm = useCallback(() => {
    setTerm((prev) => !prev);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setInitSubmit(true);
      const isAllPass = verifyInputs();
      if (!isAllPass) return;
      dispatch(verifyInfoRequest({ nickname, password }));
    },
    [dispatch, verifyInputs, nickname, password],
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
        <S.WarningText>
          ※ 비밀번호는 8자리 이상의 대소문자와 숫자, 특수문자를 각 1개 이상을
          입력하셔야 합니다
        </S.WarningText>
        {passwordTestError && (
          <S.WarningText>형식에 맞는 비밀번호를 입력하세요!</S.WarningText>
        )}
        {passwordMatchError && (
          <S.WarningText>비밀번호가 일치하지 않습니다!</S.WarningText>
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
        {termError && <S.WarningText>약관에 동의하셔야 합니다!</S.WarningText>}
        <CS.SubmitButton type="submit" complete={false}>
          계속
        </CS.SubmitButton>
      </CS.Form>
    </CS.Container>
  );
};

export default Index;
