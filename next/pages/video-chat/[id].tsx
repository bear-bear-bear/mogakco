import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import CustomHead from '@components/common/CustomHead';
import Container from '@components/video-chat/Container';
import CamSection from '@components/video-chat/CamSection';
import ChatSection from '@components/video-chat/ChatSection';
import devModeLog from '@lib/devModeLog';
import apiClient, { logAxiosError, Memory, memoryStore } from '@lib/apiClient';
import type { Error } from '@lib/apiClient';
import { refreshAccessTokenApiSSR } from '@lib/fetchers';
import useSocket from '@hooks/useSocket';

import { IUserProps } from 'typings/auth';
import { IJoinChatRoomProps } from '../../../types/chat';

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

type Props = {
  user?: IUserProps;
};

const ChatRoom = ({ user }: Props) => {
  const router = useRouter();
  const socket = useSocket();
  console.log({ socket });

  useEffect(() => {
    if (user) {
      const props: IJoinChatRoomProps = {
        userId: user.id,
        roomId: String(router.query.id),
      };

      socket?.emit('join-chat-room', props);
    }
    socket?.emit('events', { name: 'Nest' }, (data: string) =>
      console.log(data),
    );
  }, [router.query.id, socket, user]);

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
      data: { accessToken, user },
    } = await refreshAccessTokenApiSSR(headers);
    memoryStore.set(Memory.ACCESS_TOKEN, accessToken);
    devModeLog('서버사이드에서 로그인이 연장처리 되었습니다.');

    await apiClient.get<{
      message: boolean;
      statusCode: number;
    }>(`/api/chat/available/${id}`);

    return { props: { user } };
  } catch (error) {
    logAxiosError(error as Error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default ChatRoom;
