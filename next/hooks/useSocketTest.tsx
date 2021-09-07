import useSWR from 'swr';
import SocketIOClient from 'socket.io-client';

export const SOCKET_TEST_KEY = 'socket-test';
const SOCKET_SERVER = 'http://localhost:8001';

export default function useSocketTest() {
  const { data: client, mutate } = useSWR(SOCKET_TEST_KEY, () =>
    SocketIOClient(SOCKET_SERVER),
  );
  return {
    client,
    mutate,
  };
}
