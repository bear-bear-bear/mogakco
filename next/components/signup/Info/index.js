import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import useInput from '~/hooks/useInput';
import { saveRequiredInfo } from '~/redux/reducers/signup';
import { passwordRule } from '~/lib/regex';
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
  const [password, onChangePassword] = useInput('');
  const [passwordConfirm, onChangePasswordConfirm] = useInput('');
  const [initSubmitDone, setInitSubmitDone] = useState(false);
  const [term, setTerm] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordTestError, setPasswordTestError] = useState(false);
  const [termError, setTermError] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const usernameEl = useRef(null);
  const passwordInputEl = useRef(null);
  const passwordConfirmInputEl = useRef(null);

  useEffect(() => {
    usernameEl.current.focus();
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
            ref={usernameEl}
            required
          />
        </InputWrapper>
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
            ※ 비밀번호는 문자, 숫자, 기호를 조합하여 8자 이상을 사용하세요
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
        {passwordTestError && (
          <Warning>형식에 맞는 비밀번호를 입력하세요.</Warning>
        )}
        {passwordMatchError && <Warning>비밀번호가 일치하지 않습니다.</Warning>}
        {termError && <Warning>약관에 동의하셔야 합니다.</Warning>}
        <S.CustomSubmitButton type="submit" complete={false}>
          계속
        </S.CustomSubmitButton>
      </Form>
    </>
  );
};

export default Info;
