import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import useUser from '@hooks/useUser';
import { useRouter } from 'next/router';
import { getServerUrl } from '@lib/enviroment';

export default function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useUser();
  const { query } = useRouter();

  useEffect(() => {
    const serverUrl = getServerUrl('socket');
    const client = io(serverUrl, {
      auth: {
        'user-id': user?.id,
        'room-id': query.id,
        'user-name': user?.username,
      },
    });
    setSocket(client);

    function cleanup() {
      client.disconnect();
    }

    return cleanup;
    // 한번 만 렌더링 되어야 합니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user?.isLoggedIn ? socket : null;
}
