import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import type { SWRConfiguration, KeyedMutator } from 'swr/dist/types';

import token, { ACCESS_TOKEN } from '@lib/token';
import apiClient, { logAxiosError } from '@lib/apiClient';

import type { IUserGetResponse } from 'typings/auth';
import { GeneralAxiosError } from 'typings/common';

interface UseUserProps {
  redirectTo?: `/${string}`;
  redirectIfFound?: boolean;
}

const SWR_CACHE_KEY = '/api/auth/user';
const SWROptions: SWRConfiguration<IUserGetResponse> = {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // Never url
    if (key === SWR_CACHE_KEY) return;

    // count
    if (retryCount >= 10) return;

    setTimeout(() => revalidate({ retryCount }), 5000);
  },
  fallbackData: { isLoggedIn: false },
};

const getSWRKeyByRefreshTokenExist = () => {
  const isRefreshTokenExist = token.isRefreshTokenInCookie();
  if (!isRefreshTokenExist) return null;

  // 리프레쉬 토큰이 존재한다면,
  // 요청 전 axios interceptor 에서 리프레쉬 토큰을 통해 액세스 토큰의 존재를 대부분의 경우 보장합니다.
  const accessToken = token.get()[ACCESS_TOKEN];
  return [SWR_CACHE_KEY, accessToken];
};

const fetcher = async (url: string, accessToken: string) => {
  const header = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const res = await apiClient.get<IUserGetResponse>(url, header);
  return res.data;
};

/**
 * @desc
 * swr을 사용하여 user 정보를 받아와 리디렉션과 static generation을 담당합니다.
 * user 정보는 액세스 토큰으로 요청하며,
 * swr fetcher가 axios 함수이므로 유저 정보 패치 전 인터셉터를 통해 현재 액세스 토큰의 유효성 여부 판단과 그에 따른 갱신 또한 이뤄지게 됩니다.
 * 요청에 대한 응답이 400, 401, 403, 404 등일 때, 재요청 폴링을 금지합니다.
 * ---
 * @param redirectTo {`/${string}`} (optional) 리디렉션 경로
 * @param redirectIfFound {boolean} (optional) Authorization이 필요하지 않은 페이지에서 true로 설정
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
}: UseUserProps = {}) {
  const router = useRouter();
  const SWRKey = redirectIfFound ? SWR_CACHE_KEY : getSWRKeyByRefreshTokenExist;
  const {
    data: user,
    error,
    mutate: mutateUser,
  } = useSWR<IUserGetResponse>(SWRKey, fetcher, SWROptions);

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    // 리디렉트가 필요하지 않다면 return (예: 이미 /dashboard에 있음)
    if (!redirectTo) return;
    if (!user) return;

    if (
      // Authorization이 필요한 페이지인데 사용자 비로그인 상태라면 리디렉션
      (!redirectIfFound && !user.isLoggedIn) ||
      // Authorization이 필요하지 않은 페이지인데 사용자가 로그인 상태라면 리디렉션
      (redirectIfFound && user.isLoggedIn) ||
      // Authorization이 필요한 페이지인데, 리프레쉬 토큰이 쿠키에 없는데 액세스 토큰은 메모리에 있는 상황이라면 (사용자가 쿠키를 고의로 지웠을 경우) 리디렉션
      (!redirectIfFound &&
        !token.isRefreshTokenInCookie() &&
        token.get()[ACCESS_TOKEN])
    ) {
      router.push(redirectTo);
    }
  }, [redirectIfFound, redirectTo, router, user]);

  return { user, mutateUser };
}

/**
 * @desc mutate를 props로 넘겨줄때 사용할 인터페이스
 */
export interface UserMutator {
  mutateUser: KeyedMutator<IUserGetResponse>;
}
