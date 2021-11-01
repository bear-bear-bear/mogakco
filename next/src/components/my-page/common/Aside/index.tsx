import React from 'react';
import ActiveLink from '@components/common/ActiveLink';

import * as S from './style';

const Aside = () => (
  <S.Aside>
    <ul>
      <li>
        <ActiveLink activeClassName="active" href="/my-page">
          <a>대시보드</a>
        </ActiveLink>
      </li>
      <li>
        <ActiveLink activeClassName="active" href="/my-page/todo">
          <a>TODO</a>
        </ActiveLink>
      </li>
      <li>
        <ActiveLink activeClassName="active" href="/my-page/account-setting">
          <a>계정 설정</a>
        </ActiveLink>
      </li>
    </ul>
  </S.Aside>
);

export default Aside;
