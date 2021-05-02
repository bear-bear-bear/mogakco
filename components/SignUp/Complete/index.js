import React, { useCallback } from 'react';
import Router from 'next/router';

import * as CS from '../common/styles';

const Index = () => {
  const onClickLogo = useCallback(() => {
    Router.push('/');
  }, []);
  return (
    <CS.Container>
      <CS.Title>회원가입이 완료되었습니다!</CS.Title>
      <CS.SubmitButton type="button" onClick={onClickLogo} complete>
        <a>모각코 참여하러 가기</a>
      </CS.SubmitButton>
    </CS.Container>
  );
};

export default Index;
