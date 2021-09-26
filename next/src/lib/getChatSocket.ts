import { Socket, io } from 'socket.io-client';
import { ParsedUrlQuery } from 'querystring';
import { getServerUrl } from '@lib/enviroment';
import token, { ACCESS_TOKEN } from '@lib/token';
import { IUserGetResponse } from '../../typings/auth';

type UserType = IUserGetResponse | undefined;

/**
 * @desc 모각코 채팅 서비스 설정으로 소켓 클라이언트를 반환합니다.
 */
export default function getChatSocket(
  user: UserType,
  query: ParsedUrlQuery,
): Socket {
  const url = `${getServerUrl()}/chat`;
  return io(url, {
    auth: {
      userId: user?.id,
      roomId: query.id,
      userName: user?.username,
    },
    extraHeaders: {
      Authorization: `Bearer ${token.get()[ACCESS_TOKEN]}`,
    },
  });
}
