import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import type { SWRConfiguration } from 'swr';

import fetcher from '@lib/fetcher';
import { memoryStorage, ACCESS_TOKEN } from '@lib/token';
import type {
  IUserGetSuccessResponse,
  IUserGetFailureResponse,
} from 'typings/auth';
import type { IGeneralServerResponse } from 'typings/common';

interface IProps {
  redirectTo?: `/${string}`;
  redirectIfFound?: boolean;
}

// TODO: 옵션 설정
const SWROptions: SWRConfiguration<
  IUserGetSuccessResponse | IUserGetFailureResponse,
  IGeneralServerResponse
> = {};

/**
 * TODO: hooks에 대한 주석으로 변경 (현재는 단순 기획 관련 체크사항들)
 * 로그인 - 서버가 refresh 토큰을 쿠키에 저장
 * 1. 액세스 토큰 메모리에 저장
 * 2. expiration 로컬 스토리지에 저장
 * -------------------------------------------------------
 * 로그아웃 - 서버가 refresh 토큰을 쿠키에서 삭제
 * 1. 액세스 토큰 메모리에서 삭제
 * 2. expiration 로컬 스토리지에서 삭제
 * -----
 * 페이지 진입 시 로그인 상태 판별 방법?
 * - 기존엔 SSR로 로그인 여부 확인 ( 페이지에서 SSR로 인증여부를 확인하여 props로 컴포넌트 말단까지 내려주는 방식 )
 * - 개선 방안 - 컴포넌트에서 useUser hook 사용
 */
export default function useUser({
  redirectTo,
  redirectIfFound = false,
}: IProps = {}) {
  const router = useRouter();
  const { data: user, mutate: mutateUser } = useSWR<
    IUserGetSuccessResponse | IUserGetFailureResponse,
    IGeneralServerResponse
  >(
    `/api/auth/user?accessToken=${memoryStorage.get(ACCESS_TOKEN)}`,
    // fetcher, // 서버단 API 추가 시 주석 제거
    // SWROptions,
  );

  useEffect(() => {
    console.log({ redirectTo, redirectIfFound, user });
    // 리디렉트가 필요하지 않다면 그냥 return (예: 이미 /dashboard에 있음)
    // 사용자 데이터가 아직 존재하지 않으면(패치 진행 중 일때 등) 아직 아무것도 하지 않음
    if (!redirectTo || !user) return;

    if (
      // redirectTo가 설정되어 있을 시, 사용자가 없을 때 리디렉션
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // redirectIfFound가 설정되어 있을 시, 사용자가 발견되면 리디렉션
      (redirectTo && redirectIfFound && user?.isLoggedIn)
    ) {
      alert(`redirectTo: ${redirectTo}`);
      router.push(redirectTo);
    }
  }, [redirectIfFound, redirectTo, router, user]);

  return { user, mutateUser };
}
