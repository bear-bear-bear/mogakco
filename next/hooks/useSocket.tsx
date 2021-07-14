import { useState, useEffect, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

const SOCKET_SERVER = 'http://localhost:8001/chat';

export default function useSocket() {
  const [socket, setSocket] = useState<typeof Socket | undefined>(undefined);

  const connect = useCallback(() => {
    const socketIO = io.connect(SOCKET_SERVER);
    setSocket((prev) => (prev === undefined ? socketIO : prev));
  }, []);

  useEffect(() => {
    connect();
    return () => {
      socket?.disconnect();
    };
  }, [connect, socket]);

  return socket;
}
