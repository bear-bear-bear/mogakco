import useSWR from 'swr';
import SocketIOClient from 'socket.io-client';
import { useEffect } from 'react';

export const SOCKET_TEST_KEY = 'socket-test';
const SOCKET_SERVER = 'http://localhost:8001/chat';

export default function useSocket() {
  const { data: client, mutate } = useSWR(
    SOCKET_TEST_KEY,
    () =>
      SocketIOClient(SOCKET_SERVER, {
        reconnectionDelay: 2000,
      }),
    {
      revalidateOnFocus: false,
    },
  );
  useEffect(() => {
    return () => {
      client?.disconnect();
    };
  }, [client]);

  return {
    client,
    mutate,
  };
}
