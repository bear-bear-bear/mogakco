import CustomHead from '@components/common/CustomHead';
import Container from '@components/video-chat/Container';
import CamSection from '@components/video-chat/CamSection';
import ChatSection from '@components/video-chat/ChatSection';
import useUser from '@hooks/useUser';
import apiClient, { logAxiosError } from '@lib/apiClient';
import devModeLog from '@lib/devModeLog';
import type { GeneralAxiosError } from 'typings/common';
import { GetServerSideProps } from 'next';
import { refreshAccessTokenApiSSR } from '@lib/apis';
import token from '@lib/token';
import { useRouter } from 'next/router';
import useSocket from '@hooks/useSocket';
import { useEffect } from 'react';

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const ChatRoom = () => {
  const router = useRouter();
  const { user } = useUser({ redirectTo: '/' });
  const { client } = useSocket();
  devModeLog({ client, user });

  useEffect(() => {
    if (!client || !user?.isLoggedIn) return;

    const { id: userId } = user;
    const props: { userId: number; roomId: string } = {
      userId,
      roomId: String(router.query.id),
    };

    client.emit(
      'joinChatRoom',
      props,
      (data: { joinedUserName: string; joinedRoomId: string }) => {
        console.log(data);
      },
    );
  }, [router.query.id, client, user]);

  if (!user?.isLoggedIn) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <Container>
        <CamSection />
        <ChatSection />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req: { headers },
  query: { id },
}) => {
  try {
    const {
      data: { accessToken },
    } = await refreshAccessTokenApiSSR(headers);
    token.set({ accessToken });
    devModeLog('서버사이드에서 로그인이 연장처리 되었습니다.');

    const { data } = await apiClient.get<{
      message: boolean;
      statusCode: number;
    }>(`/api/chat/available/${id}`);
    devModeLog(`Server Response Message: ${data.message}`);
    devModeLog(`Response Status Code: ${data.statusCode}`);

    return { props: {} };
  } catch (error) {
    logAxiosError(error as GeneralAxiosError);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default ChatRoom;
