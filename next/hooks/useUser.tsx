import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import type { SWRConfiguration } from 'swr';

import fetcher from '@lib/fetcher';
import devModeLog from '@lib/devModeLog';
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
    const status = error.response?.status as number;
    if (unAuthorizedStatus.includes(status)) {
      return;
    }
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
};

/**
 * @desc
 * swr을 사용하여 user 정보를 받아와 리디렉션과 static generation을 담당합니다.
 * user 정보는 액세스 토큰으로 요청하며,
 * swr fetcher가 axios 함수이므로 유저 정보 패치 전 인터셉터를 통해 현재 액세스 토큰의 유효성 여부 판단과 그에 따른 갱신 또한 이뤄지게 됩니다.
 * 요청에 대한 응답이 400, 401, 403, 404 등일 때, 재요청 폴링을 금지합니다.
 * ---
 * @param redirectTo {`/${string}`} (optional) 리디렉션 경로 - redirectTo가 설정되어 있을 시, 사용자가 없을 때 리디렉션
 * @param redirectIfFound {boolean} (optional) 리디렉션 경로 - redirectTo가 설정되어 있을 시, 사용자가 없을 때 리디렉션
 * ---
 * @example
 * // 1. 유저가 없다면 '/' 경로로 리디렉션 됩니다.
 *  const MyPageRequiredAuthentication = () => {
      const { user } = useUser({ redirectTo: '/' });
      
      if (!user?.isLoggedIn) return null;
      return (
        // ... page content ....
      )
    }
 */
export default function useUser({
  redirectTo,
  redirectIfFound = false,
}: IProps = {}) {
  const router = useRouter();
  const { data: user, mutate: mutateUser } = useSWR<
    IUserGetSuccessResponse | IUserGetFailureResponse,
    GeneralAxiosError
  >('/api/auth/user', fetcher, SWROptions);

  useEffect(() => {
    // 리디렉트가 필요하지 않다면 return (예: 이미 /dashboard에 있음)
    // 사용자 데이터가 아직 존재하지 않으면(패치 진행 중 일때 등) return
    if (!redirectTo && !user) return;

    devModeLog({ redirectTo, redirectIfFound, user });

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
