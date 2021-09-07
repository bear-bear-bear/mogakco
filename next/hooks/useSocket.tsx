import { useState, useEffect, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

const SOCKET_SERVER = 'http://localhost:8001/chat';

export default function useSocket() {
  const [socket, setSocket] = useState<typeof Socket | undefined>(undefined);

  const connect = useCallback(() => {
    const socketIO = io(SOCKET_SERVER);
    setSocket(socketIO);
  }, []);

  useEffect(() => {
    connect();
    return () => {
      socket?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return socket;
}
