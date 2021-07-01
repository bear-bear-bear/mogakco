import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import {
  initialData,
  State as InitialType,
  SIGN_UP_KEY,
} from '@hooks/useSignUp';
import { signUpAPIs } from '@lib/APIs';
import { isDevelopment } from '@lib/enviroment';
import { logAxiosError } from '@lib/apiClient';
import CustomHead from '@components/common/CustomHead';
import AuthContainer from '@components/common/AuthContainer';
import ProgressBar from '@components/signup/ProgressBar';
import Start from '@components/signup/Start';
import RequiredInfo from '@components/signup/RequiredInfo';
import OptionalInfo from '@components/signup/OptionalInfo';
import End from '@components/signup/End';

interface Props {
  isQuery: boolean;
  initialProps: InitialType;
}

const pageProps = {
  title: '회원가입 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const SignUp = ({ isQuery, initialProps }: Props) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(isQuery);
  const {
    data: { isSaveRequiredInfo, isSignUpDone, isVerifyEmail } = initialData,
  } = useSWR<InitialType>(SIGN_UP_KEY, () => initialProps);

  const router = useRouter();

  const fill = [isVerifyEmail, isSaveRequiredInfo, isSignUpDone];

  useEffect(() => {
    // 이메일 링크를 타고 들어와 관련 쿼리가 주소창에 남아있다면, 해당 쿼리 clear
    if (isSuccess) {
      router.replace(`/signup`, undefined, { shallow: true });
    }
    setIsSuccess(false);
  }, [isSuccess, router]);

  return (
    <>
      <CustomHead {...pageProps} />
      <AuthContainer progressBar={<ProgressBar fill={fill} />}>
        {!isVerifyEmail && <Start />}
        {isVerifyEmail && !isSaveRequiredInfo && <RequiredInfo />}
        {isSaveRequiredInfo && !isSignUpDone && <OptionalInfo />}
        {isSignUpDone && <End />}
      </AuthContainer>
    </>
  );
};

// 이메일 검증 링크를 타고 이 페이지로 들어와 관련 쿼리가 있다면,
// 해당 쿼리로 이후의 로직 실행
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { success, email } = query;
  const isQuery = Boolean(success);
  const { verifyEmailAPI } = signUpAPIs;

  if (isQuery) {
    const initialProps = await verifyEmailAPI(email as string)
      .then(() => ({
        ...initialData,
        isVerifyEmail: true,
      }))
      .catch((err) => {
        if (isDevelopment) {
          logAxiosError(err);
        }
        return {
          ...initialData,
          isVerifyEmail: false,
        };
      });

    return {
      props: {
        isQuery,
        initialProps,
      },
    };
  }

  return {
    props: {},
  };
};

export default SignUp;
