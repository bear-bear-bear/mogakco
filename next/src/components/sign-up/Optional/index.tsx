import React, { useState, SyntheticEvent } from 'react';

import getSessionStorageValues from '@lib/getSessionStorageValues';
import Desc from '@components/common/Desc';
import Form from '@components/common/Form';
import { signUpApi } from '@lib/apis';
import token from '@lib/token';
import { logAxiosError } from '@lib/apiClient';
import type { IOptionalPageProps } from '@pages/sign-up/optional';
import type { UserMutator } from '@hooks/useUser';
import type { ISignUpProps } from 'typings/auth';
import type { GeneralAxiosError } from 'typings/common';

import JobSelect from './JobSelect';
import SkillsSelect from './SkillsSelect';

import * as CS from '../common/styles';

const Optional = ({
  jobOptions,
  skillOptions,
  mutateUser,
}: IOptionalPageProps & UserMutator) => {
  const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
  const [skillIds, setSkillIds] = useState<string[] | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setSignUpLoading(true);

    const signUpInfo = {
      ...getSessionStorageValues('email', 'username', 'password'),
      job: jobId,
      skills: skillIds,
    } as ISignUpProps;

    try {
      const {
        data: { accessToken, expiration, user },
      } = await signUpApi(signUpInfo);
      mutateUser({
        ...user,
        isLoggedIn: true,
      });
      token.set({ accessToken, expiration });
    } catch (error) {
      logAxiosError(error as GeneralAxiosError);
    }

    window.sessionStorage.clear(); // 회원가입 과정에서 사용자가 입력했던 정보 비우기
    setSignUpLoading(false);
  };

  return (
    <>
      <Desc>아래 항목들은 선택 사항입니다.</Desc>
      <Desc>작성하시면 랭킹 시스템에 참여할 수 있어요</Desc>
      <Form action="" onSubmit={onSubmit}>
        <JobSelect options={jobOptions} setId={setJobId} />
        <SkillsSelect options={skillOptions} setIds={setSkillIds} />
        <CS.SubmitButton type="submit" $loading={signUpLoading}>
          완료
        </CS.SubmitButton>
      </Form>
    </>
  );
};

export default Optional;
