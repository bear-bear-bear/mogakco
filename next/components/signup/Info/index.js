import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import useInput from '~/hooks/useInput';
import { saveRequiredInfo } from '~/redux/reducers/signup';
import { passwordRule } from '~/libs/regex';

import * as CS from '../common/styles';
import * as S from './style';

const Index = () => {
  const dispatch = useDispatch();
  const [password, onChangePassword] = useInput('');
  const [passwordConfirm, onChangePasswordConfirm] = useInput('');
  const [initSubmitDone, setInitSubmitDone] = useState(false);
  const [term, setTerm] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordTestError, setPasswordTestError] = useState(false);
  const [termError, setTermError] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const nicknameEl = useRef(null);
  const passwordInputEl = useRef(null);
  const passwordConfirmInputEl = useRef(null);

  useEffect(() => {
    nicknameEl.current.focus();
  }, []);

  useEffect(() => {
    if (passwordTestError) {
      passwordInputEl.current.focus();
    }
  }, [passwordTestError]);

  useEffect(() => {
    // 사용자가 비밀번호를 수정하는 도중에는 비밀번호 확인 input으론 focus가 발생하지 않도록 설정
    if (passwordMatchError && !isTypingPassword) {
      passwordConfirmInputEl.current.focus();
    }
  }, [passwordMatchError, isTypingPassword]);

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
    if (!initSubmitDone) return;
    verifyInputs();
  }, [verifyInputs, initSubmitDone]);

  const flipIsTypingPassword = () => {
    setIsTypingPassword((prev) => !prev);
  };

  const onChangeTerm = () => {
    setTerm((prev) => !prev);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setInitSubmitDone(true);

      const isAllPass = verifyInputs();
      if (!isAllPass) return;

      dispatch(
        saveRequiredInfo({
          nickname: nicknameEl.current.value,
          password,
        }),
      );
    },
    [dispatch, verifyInputs, password],
  );

  return (
    <CS.Container>
      <CS.Title>별명과 비밀번호를 입력하세요</CS.Title>
      <CS.Description>설정한 별명은 나중에 수정할 수 있어요.</CS.Description>
      <CS.Form action="" onSubmit={onSubmit}>
        <CS.InputWrapper>
          <CS.Label htmlFor="nickname">* 별명</CS.Label>
          <CS.Input
            type="text"
            id="nickname"
            size="small"
            ref={nicknameEl}
            required
          />
        </CS.InputWrapper>
        <CS.InputWrapper>
          <CS.Label htmlFor="password">* 비밀번호</CS.Label>
          <CS.Input
            type="password"
            id="password"
            value={password}
            onChange={onChangePassword}
            onFocus={flipIsTypingPassword}
            onBlur={flipIsTypingPassword}
            size="small"
            ref={passwordInputEl}
            required
          />
        </CS.InputWrapper>
        <CS.InputWrapper>
          <CS.Label htmlFor="passwordConfirm">* 비밀번호 확인</CS.Label>
          <CS.Input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
            size="small"
            ref={passwordConfirmInputEl}
            required
          />
        </CS.InputWrapper>
        <S.DescWrapper>
          <CS.Description size="small">
            ※ 비밀번호는 문자, 숫자, 기호를 조합하여 8자 이상을 사용하세요
          </CS.Description>
        </S.DescWrapper>
        <S.TermWrapper>
          <CS.CheckBox
            type="checkbox"
            id="policy"
            value={term}
            onChange={onChangeTerm}
          />
          <CS.Label htmlFor="policy">
            (필수)개인정보 수집 및 이용에 동의하겠습니다.
          </CS.Label>
        </S.TermWrapper>
        {passwordTestError && (
          <CS.WarningText>형식에 맞는 비밀번호를 입력하세요.</CS.WarningText>
        )}
        {passwordMatchError && (
          <CS.WarningText>비밀번호가 일치하지 않습니다.</CS.WarningText>
        )}
        {termError && (
          <CS.WarningText>약관에 동의하셔야 합니다.</CS.WarningText>
        )}
        <S.CustomSubmitButton type="submit" complete={false}>
          계속
        </S.CustomSubmitButton>
      </CS.Form>
    </CS.Container>
  );
};

export default Index;
