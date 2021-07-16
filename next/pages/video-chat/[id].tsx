import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import CustomHead from '@components/common/CustomHead';
import Container from '@components/video-chat/Container';
import CamSection from '@components/video-chat/CamSection';
import ChatSection from '@components/video-chat/ChatSection';
import devModeLog from '@lib/devModeLog';
import useUser from '@hooks/useUser';
import { socketServer } from '@pages/_app';

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const ChatRoom = () => {
  const router = useRouter();
  const { user } = useUser({ redirectTo: '/' });
  const { id } = useMemo(() => router.query, [router.query]);

  useEffect(() => {
    socketServer.emit('joinChatRoom', id);
    socketServer.on('joinUserMessage', (clientId: string) => {
      devModeLog(`${clientId} 유저가 접속하였다고 응답 되었음.`);
    });
  }, [id]);

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

export default ChatRoom;
