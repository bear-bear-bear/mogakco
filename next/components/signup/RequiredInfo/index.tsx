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
import UserNameForm from '~/components/signup/RequiredInfo/FormContent/UserNameForm';
import PasswordForm from '~/components/signup/RequiredInfo/FormContent/PasswordForm';
import TermForm from '~/components/signup/RequiredInfo/FormContent/TermForm';

export type FormInputs = {
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
    const isAllPass = hardVerifyInputs();
    if (!isAllPass) return;

    dispatch(
      saveRequiredInfo({
        username,
        password,
      }),
    );
  }, [dispatch, hardVerifyInputs, password, username]);

  const onError = () => {
    setInitSubmitDone(true);
    hardVerifyInputs();
  };

  const flipIsTypingPassword = () => setIsTypingPassword((prev) => !prev);

  useEffect(() => {
    // 처음 화면이 렌더링 됐을 땐 오류를 표시하지 않음
    if (!initSubmitDone) return;

    // 타이핑에 대해 디바운싱
    if (debouncingTimer.current !== 0) {
      // TODO: 검토 포인트 if 구간 발생 안하는 중 "왜? galaxy4276이 코드를 망쳐서" writen by galaxy4276
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

  // TODO: 검토 포인트
  useEffect(() => {
    // 사용자가 비밀번호를 수정하는 도중에는 비밀번호 확인 input 으론 focus 가 발생하지 않도록 설정
    // TODO: 위 주석에 의미 확인 부탁드립니다.
    if (passwordMatchError && !isTypingPassword) {
      setFocus('passwordConfirm'); // 비밀번호 확인 input 으로 focus 가 발생하지 않게 한다고 했는데 발생되게 함.
    }
  }, [passwordMatchError, isTypingPassword, setFocus]);

  return (
    <>
      <CS.Title>별명과 비밀번호를 입력하세요</CS.Title>
      <Desc>설정한 별명은 나중에 수정할 수 있어요.</Desc>
      <Form action="" onSubmit={handleSubmit(onSubmit, onError)}>
        <UserNameForm register={register} />
        <PasswordForm
          register={register}
          password={password}
          flipIsTypingPassword={flipIsTypingPassword}
        />
        <Error
          isUsernameError={usernameError}
          username={username}
          isPasswordError={passwordTestError}
          isPasswordMatchError={passwordMatchError}
          isTermError={termError}
        />
        <S.DescWrapper>
          <Desc scale="small">
            ※ 비밀번호는 영문, 숫자, 기호를 조합하여 8자 이상을 사용하세요
          </Desc>
        </S.DescWrapper>
        <TermForm term={term} onChangeTerm={onChangeTerm} />
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
