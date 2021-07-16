import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import type { SWRConfiguration } from 'swr';

import fetcher from '@lib/fetcher';
import type {
  IUserGetSuccessResponse,
  IUserGetFailureResponse,
} from 'typings/auth';
import type { GeneralAxiosError } from 'typings/common';

// useUser props
interface IProps {
  redirectTo?: `/${string}`;
  redirectIfFound?: boolean;
}

// SWRConfiguration
const unAuthorizedStatus = [400, 401, 403, 404];
const SWROptions: SWRConfiguration<
  IUserGetSuccessResponse | IUserGetFailureResponse,
  GeneralAxiosError
> = {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Never retry
    const status = error.response?.status as number;
    if (unAuthorizedStatus.includes(status)) return;

    // Retry after 5 seconds.
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
};

/**
 * TODO: hooks에 대한 주석으로 변경
 */
export default function useUser({
  redirectTo,
  redirectIfFound = false,
}: IProps = {}) {
  const router = useRouter();
  const { data: user, mutate: mutateUser } = useSWR<
    IUserGetSuccessResponse | IUserGetFailureResponse,
    GeneralAxiosError
  >(
    '/api/auth/user',
    fetcher, // 서버단 API 추가 시 주석 제거
    SWROptions,
  );

  useEffect(() => {
    console.log({ redirectTo, redirectIfFound, user });

    // 리디렉트가 필요하지 않다면 return (예: 이미 /dashboard에 있음)
    // 사용자 데이터가 아직 존재하지 않으면(패치 진행 중 일때 등) return
    if (!redirectTo && !user) return;

    if (
      // redirectTo가 설정되어 있을 시, 사용자가 없을 때 리디렉션
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // redirectIfFound가 설정되어 있을 시, 사용자가 발견되면 리디렉션
      (redirectTo && redirectIfFound && user?.isLoggedIn)
    ) {
      router.push(redirectTo);
    }
  }, [redirectIfFound, redirectTo, router, user]);

  return { user, mutateUser };
}
