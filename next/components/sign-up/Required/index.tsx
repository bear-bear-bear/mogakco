import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import useIsomorphicLayoutEffect from '@hooks/useIsomorphicLayoutEffect';
import Desc from '@components/common/Desc';
import Form from '@components/common/Form';
import getSessionStorageValues from '@lib/getSessionStorageValues';

import type { InputValues } from './typings';
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

const Required = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setFocus,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<InputValues>({
    defaultValues: initialState,
  });

  console.log(errors);
  const onSubmit = (e) => {
    const { username, password } = getValues();
    window.sessionStorage.setItem('username', username);
    window.sessionStorage.setItem('password', password);

    router.push('/sign-up/optional');
  };

  useIsomorphicLayoutEffect(() => {
    setFocus('username');
  }, [setFocus]);

  useEffect(() => {
    // optional 페이지 prefetch
    router.prefetch('/sign-up/optional');

    // 쿼리 이메일 저장 후 해당 쿼리 삭제
    const { email } = router.query;
    window.sessionStorage.setItem('email', email as string);

    // 만약 뒤로가기로 접근했다면 (이 단계를 완료했었다면) 입력했던 값 다시 세팅
    const { username: typedUsername, password: typedPassword } =
      getSessionStorageValues('username', 'password');
    if (typedUsername && typedPassword) {
      setValue('username', typedUsername);
      setValue('password', typedPassword);
      setValue('passwordConfirm', typedPassword);
      setValue('term', true);
    }
  }, [router, setValue]);

  return (
    <>
      <CS.Title>별명과 비밀번호를 입력하세요</CS.Title>
      <Desc>설정한 별명은 나중에 수정할 수 있어요.</Desc>
      <Form action="" onSubmit={handleSubmit(onSubmit)}>
        <UsernameSection register={register} />
        <PasswordSection
          register={register}
          setError={setError}
          clearErrors={clearErrors}
        />
        <S.DescWrapper>
          <Desc scale="small">
            ※ 비밀번호는 영문, 숫자, 기호를 조합하여 8자 이상을 사용하세요
          </Desc>
        </S.DescWrapper>
        <TermSection register={register} />
        <ErrorSection errors={errors} />
        <S.CustomSubmitButton type="submit">계속</S.CustomSubmitButton>
      </Form>
    </>
  );
};

export default React.memo(Required);
