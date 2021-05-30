import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import useInput from '~/hooks/useInput';
import {
  saveRequiredInfo,
  loadSkillsRequest,
  loadJobsRequest,
} from '~/redux/reducers/signup';
import { usernameRule, passwordRule } from '~/lib/regex';
import Checkbox from '~/components/common/Checkbox';
import Warning from '~/components/common/Warning';
import Desc from '~/components/common/Desc';
import Form from '~/components/common/Form';
import InputWrapper from '~/components/common/InputWrapper';
import InputBox from '~/components/common/InputBox';
import Label from '~/components/common/Label';

import * as CS from '../common/styles';
import * as S from './style';

const Info = () => {
  const dispatch = useDispatch();
  const [initSubmitDone, setInitSubmitDone] = useState(false);
  const [username, onChangeUsername] = useInput('');
  const [usernameError, setUsernameError] = useState(false);
  const [password, onChangePassword] = useInput('');
  const [passwordTestError, setPasswordTestError] = useState(false);
  const [passwordConfirm, onChangePasswordConfirm] = useInput('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const usernameEl = useRef(null);
  const passwordInputEl = useRef(null);
  const passwordConfirmInputEl = useRef(null);

  useEffect(() => {
    usernameEl.current.focus();
    // 필수 정보 입력 페이지 진입 시 다음 단계인 추가 정보 페이지의 데이터 프리로딩
    dispatch(loadSkillsRequest());
    dispatch(loadJobsRequest());
  }, [dispatch]);

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

  useEffect(() => {
    const isSoftPass = // input 값이 모두 있는지만 검사
      Boolean(password) &&
      Boolean(username) &&
      Boolean(passwordConfirm) &&
      Boolean(term);
    setIsSoftVerificationPass(isSoftPass);
  }, [username, password, passwordConfirm, term]);

  const hardVerifyInputs = useCallback(() => {
    // input 모두 검증 후 전체 테스트 통과여부 반환
    const isUsernameError = usernameRule.test(username) === false;
    setUsernameError(isUsernameError);

    const isPasswordTestError = passwordRule.test(password) === false;
    setPasswordTestError(isPasswordTestError);

    const isPasswordMatchError = password !== passwordConfirm;
    setPasswordMatchError(isPasswordMatchError);

    const isTermError = term === false;
    setTermError(isTermError);

    return [isTermError, isPasswordTestError, isPasswordMatchError].every(
      (isError) => isError === false,
    );
  }, [username, password, passwordConfirm, term]);

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
          username: usernameEl.current.value,
          password,
        }),
      );
    },
    [dispatch, verifyInputs, password],
  );

  return (
    <>
      <CS.Title>별명과 비밀번호를 입력하세요</CS.Title>
      <Desc>설정한 별명은 나중에 수정할 수 있어요.</Desc>
      <Form action="" onSubmit={onSubmit}>
        <InputWrapper>
          <Label htmlFor="username" direction="bottom">
            * 별명
          </Label>
          <InputBox
            type="text"
            id="username"
            size="small"
            value={username}
            onChange={onChangeUsername}
            ref={usernameEl}
            spellCheck={false}
            required
          />
        </InputWrapper>
        <S.DescWrapper>
          <Desc size="small">
            ※ 한글, 영문, 숫자, 마침표를 사용할 수 있습니다
          </Desc>
        </S.DescWrapper>
        <InputWrapper>
          <Label htmlFor="password" direction="bottom">
            * 비밀번호
          </Label>
          <InputBox
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
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="passwordConfirm" direction="bottom">
            * 비밀번호 확인
          </Label>
          <InputBox
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
            size="small"
            ref={passwordConfirmInputEl}
            required
          />
        </InputWrapper>
        <S.DescWrapper>
          <Desc size="small">
            ※ 비밀번호는 영문, 숫자, 기호를 조합하여 8자 이상을 사용하세요
          </Desc>
        </S.DescWrapper>
        <S.TermWrapper>
          <Checkbox
            id="policy"
            type="checkbox"
            value={term}
            onChange={onChangeTerm}
          />
          <Label htmlFor="policy" direction="left">
            (필수)개인정보 수집 및 이용에 동의하겠습니다.
          </Label>
        </S.TermWrapper>
        {usernameError &&
          (username.length > 12 ? (
            <Warning>별명은 12자를 넘을 수 없습니다.</Warning>
          ) : (
            <Warning>형식에 맞는 별명을 입력하세요.</Warning>
          ))}
        {passwordTestError && (
          <Warning>형식에 맞는 비밀번호를 입력하세요.</Warning>
        )}
        {passwordMatchError && <Warning>비밀번호가 일치하지 않습니다.</Warning>}
        {termError && <Warning>약관에 동의하셔야 합니다.</Warning>}
        <S.CustomSubmitButton
          type="submit"
          complete={false}
          disabled={!isSoftVerificationPass}
        >
          계속
        </S.CustomSubmitButton>
      </Form>
    </>
  );
};

export default Info;
