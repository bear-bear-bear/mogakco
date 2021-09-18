import { Socket } from 'socket.io-client';
import useUser from '@hooks/useUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import devModeLog from '@lib/devModeLog';

export default function useChatError(client: Socket | null) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    client?.on('check-multiple-user', (id: number) => {
      if (user?.id === id) {
        router.push('/dashboard');
      }
    });
    client?.on('connect_error', (err) => {
      devModeLog(err.message);
      router.push('/dashboard');
    });

    function cleanup() {
      client?.off('check-multiple-user');
      client?.off('connect_error');
    }

    return cleanup();
  }, [client, router, user?.id]);
}
