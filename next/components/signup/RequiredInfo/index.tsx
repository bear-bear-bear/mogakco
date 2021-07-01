import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import type { IOptionalInfoProps } from 'typings/auth';
import useIsomorphicLayoutEffect from '@hooks/useIsomorphicLayoutEffect';
import useSignUp from '@hooks/useSignUp';
import { usernameRule, passwordRule } from '@lib/regex';
import isAllPropertyTruthy from '@lib/isAllPropertyTruthy';
import apiClient, { logAxiosError } from '@lib/apiClient';
import Desc from '@components/common/Desc';
import Form from '@components/common/Form';

import type { InputValues, InputErrorStates } from './typings';
import UsernameSection from './Sections/UsernameSection';
import PasswordSection from './Sections/PasswordSection';
import TermSection from './Sections/TermSection';
import ErrorSection from './Sections/ErrorSection';

import * as CS from '../common/styles';
import * as S from './style';

const initialState: InputValues = {
  username: '',
  password: '',
  passwordConfirm: '',
  term: false,
};

// FIXME: 타이핑마다 2번 렌더링 되는거 확인
const RequiredInfo = () => {
  const { updateSignUp } = useSignUp();
  const [initSubmitDone, setInitSubmitDone] = useState(false);
  const [isAllValues, setIsAllValues] = useState(false);
  const [errorStates, setErrorStates] = useState<InputErrorStates>({
    isUsernameError: false,
    isPasswordTestError: false,
    isPasswordMatchError: false,
    isTermError: false,
  });
  const debouncingTimer = useRef<number>(0);

  const { register, handleSubmit, getValues, setFocus, setValue, watch } =
    useForm<InputValues>({
      defaultValues: initialState,
    });

  const inputValues: InputValues = watch(); // inputValues를 useEffect deps에 넣기 위해 바로 destructuring 하지 않음
  const { username, password, term } = inputValues;

  const onChangeTerm = () => {
    const prevTerm = getValues('term');
    setValue('term', !prevTerm);
  };

  const onValid = () => {
    setInitSubmitDone(true);

    updateSignUp((prevState) => {
      // TODO: 타입 단언할 방법은 없을지 알아보기
      if (prevState) {
        return {
          ...prevState,
          userInfo: {
            ...prevState.userInfo,
            username,
            password,
          },
          isSaveRequiredInfo: true,
        };
      }
    }, false);
  };
  const onInvalid = () => setInitSubmitDone(true);

  useIsomorphicLayoutEffect(() => {
    setFocus('username');
  }, [setFocus]);

  useEffect(() => {
    // inputValues의 값이 변경될 때마다 Input 값 중 빈 값이 없는지 확인하고, 값이 모두 있다면 submit 버튼 활성화
    // 즉, 버튼 활성화는 정규식 검사와는 무관합니다.
    setIsAllValues(isAllPropertyTruthy(inputValues));
  }, [inputValues]);

  useEffect(() => {
    // inputValues의 값이 변경될 때마다 Input 전체 입력값에 대한 Validation 수행
    // 즉, 키보드 입력이 있을 때마다 Validation 수행. 디바운싱(0.2s)으로 최적화되어 있습니다.

    // 첫 submit을 수행하기 전에는 Validation을 수행하지 않음 (UX)
    if (!initSubmitDone) return;

    const verifyAllInputs = (values: InputValues) => {
      setErrorStates({
        isUsernameError: usernameRule.test(values.username) === false,
        isPasswordTestError: passwordRule.test(values.password) === false,
        isPasswordMatchError: values.passwordConfirm !== values.password,
        isTermError: values.term === false,
      });
    };

    if (debouncingTimer.current !== 0) {
      clearTimeout(debouncingTimer.current);
    }
    setTimeout(() => verifyAllInputs(inputValues), 200);
  }, [inputValues, initSubmitDone]);

  useEffect(() => {
    // 다음 단계인 optionalInfo 페이지의 데이터 프리패치
    // TODO: fetcher 모듈로 분리 (재사용 가능한 모듈로 분리할 수 있는지 생각해보기)
    // TODO: API들 모듈로 분리
    // TODO: 데이터 프리렌더링에 대해 더 좋은 방안이 있는지 찾아보기
    const getSkillsAPI = '/api/user/skills';
    const getJobsAPI = '/api/user/jobs';
    const optionalInfoListFetcher = (url: string) =>
      apiClient
        .get<IOptionalInfoProps[] | null>(url)
        .then((res) => res.data)
        .catch((err) => {
          logAxiosError(err);
          return null; // TODO: 타입 응급처치 - 수정하기
        });

    Promise.all([
      optionalInfoListFetcher(getSkillsAPI),
      optionalInfoListFetcher(getJobsAPI),
    ]).then(([skills, jobs]) => {
      updateSignUp((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            userInfo: {
              ...prevState.userInfo,
              skills,
              jobs,
            },
          };
        }
      }, false);
    });
  }, [updateSignUp]);

  return (
    <>
      <CS.Title>별명과 비밀번호를 입력하세요</CS.Title>
      <Desc>설정한 별명은 나중에 수정할 수 있어요.</Desc>
      <Form action="" onSubmit={handleSubmit(onValid, onInvalid)}>
        <UsernameSection register={register} />
        <PasswordSection register={register} password={password} />
        <S.DescWrapper>
          <Desc scale="small">
            ※ 비밀번호는 영문, 숫자, 기호를 조합하여 8자 이상을 사용하세요
          </Desc>
        </S.DescWrapper>
        <TermSection term={term} onChangeTerm={onChangeTerm} />
        <ErrorSection username={username} errorStates={errorStates} />
        <S.CustomSubmitButton type="submit" disabled={!isAllValues}>
          계속
        </S.CustomSubmitButton>
      </Form>
    </>
  );
};

export default RequiredInfo;
