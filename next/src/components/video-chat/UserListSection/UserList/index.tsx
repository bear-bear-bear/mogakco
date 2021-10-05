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
          <p>{numeral}</p>
          <p>{nickname}</p>
        </S.Item>
      ))}
    </S.List>
  );
};

export default UserList;
