import { Socket } from 'socket.io-client';
import { NextRouter } from 'next/router';
import { useEffect } from 'react';
import { ChatEvent } from '@lib/enum';
import devModeLog from '@lib/devModeLog';
import { IUserGetResponse } from 'typings/auth';

/**
 * @desc 소켓에서 발생하는 에러 관련 이벤트를 제어합니다.
 */
export default function useHandleChatErrorEvent(
  socketClient: Socket,
  user: IUserGetResponse | undefined,
  router: NextRouter,
): void {
  useEffect(() => {
    socketClient.on(ChatEvent.CHECK_MULTIPLE_USER, (id: number) => {
      if (user?.id === id) {
        router.push('/lobby');
      }
    });
    socketClient.on(ChatEvent.CONNECT_ERROR, (err) => {
      devModeLog(err.message);
      router.push('/lobby');
    });
    return () => {
      socketClient.off(ChatEvent.CHECK_MULTIPLE_USER);
      socketClient.off(ChatEvent.CONNECT_ERROR);
    };
  }, [router, socketClient, user?.id]);
}
