import React from 'react';
import { GetServerSideProps } from 'next';

import useUser from '@hooks/useUser';
import CustomHead from '@components/common/CustomHead';
import AuthContainer from '@components/common/AuthContainer';
import ProgressBar from '@components/sign-up/ProgressBar';
import Optional from '@components/sign-up/Optional';
import apiClient, { logAxiosError } from '@lib/apiClient';
import toSelectOptions from '@lib/toSelectOptions';
import { IOptionalProps } from 'typings/auth';

const pageProps = {
  title: '회원가입 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

export interface IOptionalPageProps {
  skillOptions: ReturnType<typeof toSelectOptions>;
  jobOptions: ReturnType<typeof toSelectOptions>;
}

const SignUpOptional = (props: IOptionalPageProps) => {
  const { user, mutateUser } = useUser({
    redirectTo: '/dashboard',
    redirectIfFound: true,
  });

  if (user) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <AuthContainer progressBar={<ProgressBar fill={100} />}>
        <Optional mutateUser={mutateUser} {...props} />
      </AuthContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const getSkillsAPI = '/api/user/skills';
  const getJobsAPI = '/api/user/jobs';
  const optionalInfoListApi = (url: string) =>
    apiClient
      .get<IOptionalProps[] | null>(url)
      .then((res) => res.data)
      .catch((err) => {
        logAxiosError(err);
        return null;
      });

  const [skills, jobs] = await Promise.all([
    optionalInfoListApi(getSkillsAPI),
    optionalInfoListApi(getJobsAPI),
  ]).then((fetchResults) => fetchResults);

  return {
    props: {
      skillOptions: toSelectOptions(skills),
      jobOptions: toSelectOptions(jobs),
    },
  };
};

export default SignUpOptional;
