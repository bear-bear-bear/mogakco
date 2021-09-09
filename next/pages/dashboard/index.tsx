import React, { useCallback, useState } from 'react';

import useUser from '@hooks/useUser';
import Button from '@components/common/Button';
import CustomHead from '@components/common/CustomHead';
import Container from '@components/dashboard/Container';
import CardLink from '@components/dashboard/CardLink';
import { authProlongTestApi, signOutApi } from '@lib/apis';
import token from '@lib/token';
import { logAxiosError } from '@lib/apiClient';
import type { GeneralAxiosError } from 'typings/common';
import { isDevelopment } from '@lib/enviroment';

export const pageProps = {
  title: '대시보드 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const Dashboard = () => {
  const { user, mutateUser } = useUser({ redirectTo: '/' });
  const [isTestBtnLoading, setIsTestBtnLoading] = useState<boolean>(false);

  const onClickTestButton = useCallback(async () => {
    setIsTestBtnLoading(true);
    await authProlongTestApi();
    setIsTestBtnLoading(false);
  }, []);

  const handleSignOut = async () => {
    try {
      mutateUser({ isLoggedIn: false }, false);
      token.delete();
      await signOutApi();
      mutateUser();
    } catch (error) {
      logAxiosError(error as GeneralAxiosError);
    }
  };

  // TODO: 로그아웃 버튼 스타일, 위치 등 수정하기 (공용 헤더혹은 공용 버튼그룹으로 묶기)
  if (!user?.isLoggedIn) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      {user?.isLoggedIn && (
        // 임시 위치, 임시 스타일
        <Button style={{ float: 'right' }} outline onClick={handleSignOut}>
          로그아웃
        </Button>
      )}
      {user?.isLoggedIn && isDevelopment && (
        // 임시 위치, 임시 스타일
        <Button
          type="button"
          outline
          style={{ float: 'right' }}
          onClick={onClickTestButton}
          $loading={isTestBtnLoading}
        >
          로그인 연장 테스트
        </Button>
      )}
      <Container>
        {/* <Link href={`/video-chat/${id}`}> */}
        {/* 임시로 화상채팅 1번 룸으로 가도록 설정 */}
        <CardLink
          href="/video-chat/1"
          svgName="video-chat.svg"
          title="화상 채팅"
          desc="모각코를 시작해요!"
        />
        <CardLink
          href="/my-page"
          svgName="chart-line-alt1.svg"
          title="마이페이지"
          desc="내 정보를 확인해보세요."
        />
      </Container>
    </>
  );
};

export default Dashboard;
