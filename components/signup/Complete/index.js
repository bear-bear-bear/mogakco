import React, { useCallback, useEffect, useRef } from 'react';
import Router from 'next/router';

import * as CS from '../common/styles';

const Index = () => {
  const buttonEl = useRef(null);
  useEffect(() => {
    buttonEl.current.focus();
  }, []);

  const onClickLogo = useCallback(() => {
    // TODO: 회원가입 도중 입력한 정보를 바탕으로 로그인 dispatch
    // TODO: 모각코 서비스 페이지로 이동
    Router.push('/');
  }, []);

  return (
    <CS.Container>
      <CS.Title>회원가입이 완료되었습니다!</CS.Title>
      <CS.SubmitButton
        type="button"
        ref={buttonEl}
        onClick={onClickLogo}
        complete
      >
        모각코 참여하러 가기
      </CS.SubmitButton>
    </CS.Container>
  );
};

export default Index;
