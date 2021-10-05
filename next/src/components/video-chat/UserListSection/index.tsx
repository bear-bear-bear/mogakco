import React, { useEffect, useState } from 'react';

import useChatClient from '@hooks/chat/useChatClient';
import { ChatEvent } from '@lib/enum';
import { IUserInfo } from 'typings/auth';

import Container from './Container';
import UserList from './UserList';

export type User = {
  id: IUserInfo['id'];
  nickname: string;
};
export type NumeralMappedUser = User & {
  numeral: number;
};

const UserListSection = () => {
  const socketClient = useChatClient();
  const [users, setUsers] = useState<NumeralMappedUser[]>();

  useEffect(() => {
    // socketClient.on(ChatEvent.GET_USER_LIST, (users: User[]) => {
    //   setUsers(users.map((user, idx) => ({
    //     id: user.id,
    //     nickname: user.nickname,
    //     numeral: idx,
    //   })));
    // });

    // TODO: 임시 로직. 소켓 GET_USER_LIST 이벤트 추가 시 삭제
    const tempUsers = [
      {
        id: 1,
        nickname: '김김김을 김김한 김김김',
      },
      {
        id: 26,
        nickname: '곰곰곰을 곰곰한 곰곰곰',
      },
      {
        id: 126,
        nickname: '강강강을 강강한 강강강',
      },
      {
        id: 12412,
        nickname: '궁궁궁을 궁궁한 궁궁궁',
      },
    ];
    setUsers(
      tempUsers.map((user, idx) => ({
        id: user.id,
        nickname: user.nickname,
        numeral: idx,
      })),
    );
  }, []);

  if (!users) return <Container />;
  return (
    <Container>
      <UserList users={users} />
    </Container>
  );
};

export default UserListSection;
