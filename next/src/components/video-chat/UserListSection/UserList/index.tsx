import React from 'react';

import { NumeralMappedUser } from '..';
import * as S from './style';

type Props = {
  users: NumeralMappedUser[];
};

const UserList = ({ users }: Props) => {
  return (
    <S.List>
      {users.map(({ id, numeral, nickname }) => (
        <S.Item key={id}>
          <S.Numeral>{numeral}</S.Numeral>
          <S.Nickname>{nickname}</S.Nickname>
        </S.Item>
      ))}
    </S.List>
  );
};

export default UserList;
