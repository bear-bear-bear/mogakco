import React from 'react';
import { GetServerSideProps } from 'next';

import useUser from '@hooks/useUser';
import CustomHead from '@components/common/CustomHead';
import AuthContainer from '@components/common/AuthContainer';
import ProgressBar from '@components/sign-up/ProgressBar';
import Optional from '@components/sign-up/Optional';
import toSelectOptions from '@lib/toSelectOptions';
import { loadJobsApi, loadSkillsApi } from '@lib/apis';

const pageProps = {
  title: '회원가입 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

export interface IOptionalPageProps {
  jobOptions: ReturnType<typeof toSelectOptions>;
  skillOptions: ReturnType<typeof toSelectOptions>;
}

const SignUpOptional = (props: IOptionalPageProps) => {
  const { user, mutateUser } = useUser({
    redirectTo: '/lobby',
    redirectIfFound: true,
  });

  if (user?.isLoggedIn) return null;
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
  const [skills, jobs] = await Promise.all([
    loadSkillsApi(),
    loadJobsApi(),
  ]).then((fetchResults) => fetchResults);

  return {
    props: {
      jobOptions: toSelectOptions(jobs),
      skillOptions: toSelectOptions(skills),
    },
  };
};

export default SignUpOptional;
