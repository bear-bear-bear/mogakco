import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import useTypedDispatch from '~/hooks/useTypedDispatch';

import {
  saveRequiredInfo,
  loadSkillsRequest,
  loadJobsRequest,
} from '~/redux/reducers/signup';
import { usernameRule, passwordRule } from '~/lib/regex';
import CheckboxInput from '~/components/common/Input/CheckboxInput';
import Desc from '~/components/common/Desc';
import Form from '~/components/common/Form';
import InputWrapper from '~/components/common/InputWrapper';
import TextInput from '~/components/common/Input/TextInput';
import PasswordInput from '~/components/common/Input/PasswordInput';
import Label from '~/components/common/Label';
import Error from './Error';

import * as CS from '../common/styles';
import * as S from './style';

type FormInputs = {
  username: string;
  password: string;
  passwordConfirm: string;
  term: boolean;
};

const initialState: FormInputs = {
  username: '',
  password: '',
  passwordConfirm: '',
  term: false,
};

const RequiredInfo = () => {
  const dispatch = useTypedDispatch();
  const [initSubmitDone, setInitSubmitDone] = useState(false);
  const [isSoftVerificationPass, setIsSoftVerificationPass] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordTestError, setPasswordTestError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [termError, setTermError] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const debouncingTimer = useRef<number>(0);

  const { register, handleSubmit, getValues, setFocus, setValue, watch } =
    useForm<FormInputs>({
      defaultValues: initialState,
    });

  const { username, password, passwordConfirm, term } = watch();

  const hardVerifyInputs = useCallback(() => {
    // input 모두 검증 후 전체 테스트 통과여부 반환
    const isUsernameError = usernameRule.test(username) === false; // 기존 regex 검사;
    setUsernameError(isUsernameError);

    const isPasswordTestError = passwordRule.test(password) === false; // 기존 regex 검사;
    setPasswordTestError(isPasswordTestError);

    const isPasswordMatchError = passwordConfirm !== password; // 임시
    setPasswordMatchError(isPasswordMatchError);

    const isTermError = term === false;
    setTermError(isTermError);

    return [
      isUsernameError,
      isTermError,
      isPasswordTestError,
      isPasswordMatchError,
    ].every((isError) => isError === false);
  }, [password, passwordConfirm, term, username]);

  const onChangeTerm = () => {
    setIsSoftVerificationPass((prev) => !prev);
    const term = getValues('term');
    setValue('term', !term);
  };

  const onSubmit = useCallback(() => {
    setInitSubmitDone(true);
    const values = getValues();
    console.log(values);

    const isAllPass = hardVerifyInputs();
    if (!isAllPass) return;

    dispatch(
      saveRequiredInfo({
        username: getValues('username'),
        password: getValues('password'),
      }),
    );
  }, [dispatch, getValues, hardVerifyInputs]);

  const onError = () => {
    setInitSubmitDone(true);
    hardVerifyInputs();
  };

  const onClickEye = () => setIsVisiblePassword((prev) => !prev);
  const flipIsTypingPassword = () => setIsTypingPassword((prev) => !prev);

  // TODO: 정확히 어떤 역할을 수행해내는 코드인지 모르겠습니다. 알려주시면 감사하겠습니다. 의도대로 작동되나요?
  // TODO: 검토 포인트
  useEffect(() => {
    // 처음 화면이 렌더링 됐을 땐 오류를 표시하지 않음
    if (!initSubmitDone) return;

    // 타이핑에 대해 디바운싱
    if (debouncingTimer.current !== 0) {
      clearTimeout(debouncingTimer.current);
    }
    setTimeout(() => hardVerifyInputs(), 200);
  }, [hardVerifyInputs, initSubmitDone]);

  useEffect(() => {
    setFocus('username');
    // 필수 정보 입력 페이지 진입 시 다음 단계인 추가 정보 페이지의 데이터 프리로딩
    dispatch(loadSkillsRequest());
    dispatch(loadJobsRequest());
  }, [dispatch, setFocus]);

  // 폼 입력 시 Validation 수행
  useEffect(() => {
    if (initSubmitDone) {
      hardVerifyInputs();
    }
  }, [hardVerifyInputs, initSubmitDone, watch]);

  // TODO: 검토 포인트
  useEffect(() => {
    // 사용자가 비밀번호를 수정하는 도중에는 비밀번호 확인 input 으론 focus 가 발생하지 않도록 설정
    // TODO: 위 주석에서 의미하는 케이스가 방지되고 있는 지 확인한 번 부탁드립니다.
    if (passwordMatchError && !isTypingPassword) {
      setFocus('passwordConfirm');
    }
  }, [passwordMatchError, isTypingPassword, setFocus]);

  return (
    <>
      <CS.Title>별명과 비밀번호를 입력하세요</CS.Title>
      <Desc>설정한 별명은 나중에 수정할 수 있어요.</Desc>
      <Form action="" onSubmit={handleSubmit(onSubmit, onError)}>
        <InputWrapper>
          <Label htmlFor="username" direction="bottom">
            * 별명
          </Label>
          <TextInput
            type="text"
            id="username"
            scale="small"
            spellCheck={false}
            {...register('username', { pattern: usernameRule, maxLength: 12 })}
          />
        </InputWrapper>
        <S.DescWrapper>
          <Desc scale="small">
            ※ 한글, 영문, 숫자, 마침표를 사용할 수 있습니다
          </Desc>
        </S.DescWrapper>
        <InputWrapper>
          <Label htmlFor="password" direction="bottom">
            * 비밀번호
          </Label>
          <PasswordInput
            type="password"
            id="password"
            onFocus={flipIsTypingPassword}
            scale="small"
            onClickEye={onClickEye}
            isVisible={isVisiblePassword}
            {...register('password', {
              pattern: passwordRule,
              minLength: 8,
            })}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="passwordConfirm" direction="bottom">
            * 비밀번호 확인
          </Label>
          <PasswordInput
            type="password"
            id="passwordConfirm"
            scale="small"
            onClickEye={onClickEye}
            isVisible={isVisiblePassword}
            required
            {...register('passwordConfirm', {
              validate: (value) => value === password,
            })}
          />
          <Error
            isUsernameError={usernameError}
            username={username}
            isPasswordError={passwordTestError}
            isPasswordMatchError={passwordMatchError}
            isTermError={termError}
          />
        </InputWrapper>
        <S.DescWrapper>
          <Desc scale="small">
            ※ 비밀번호는 영문, 숫자, 기호를 조합하여 8자 이상을 사용하세요
          </Desc>
        </S.DescWrapper>
        <S.TermWrapper>
          <CheckboxInput
            id="policy"
            type="checkbox"
            value={term}
            onChange={onChangeTerm}
          />
          <Label htmlFor="policy" direction="left">
            (필수)개인정보 수집 및 이용에 동의하겠습니다.
          </Label>
        </S.TermWrapper>
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

export default RequiredInfo;
