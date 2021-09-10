import useSWR from 'swr';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import devModeLog from '@lib/devModeLog';
import useUser from '@hooks/useUser';
import { useRouter } from 'next/router';

export const SOCKET_TEST_KEY = 'socket-test';
const SOCKET_SERVER = 'http://localhost:8001/chat';

export default function useSocket() {
  const { query } = useRouter();
  const roomId = query.id as string;
  const { user } = useUser();
  const { data: client, mutate } = useSWR(
    SOCKET_TEST_KEY,
    () =>
      io(SOCKET_SERVER, {
        reconnectionDelay: 2000,
        extraHeaders: {
          'user-id': String(user?.id),
          'user-name': user?.username || 'no-user',
          'room-id': roomId,
        },
      }),
    {
      revalidateOnFocus: false,
    },
  );
  useEffect(() => {
    return () => {
      devModeLog('disconnect');
      client?.disconnect();
    };
  }, [client]);

  return {
    client,
    mutate,
  };
}
