import React, { useCallback, useEffect, useRef } from 'react';
import Router from 'next/router';

import * as CS from '../common/styles';

const Complete = () => {
  const buttonEl = useRef(null);

  useEffect(() => {
    buttonEl.current.focus();
  }, []);

  const onClickButton = useCallback(() => {
    // TODO: 모각코 서비스 페이지로 이동
    Router.replace('/');
  }, []);

  return (
    <>
      <CS.Title>회원가입이 완료되었습니다!</CS.Title>
      <CS.SubmitButton
        type="button"
        ref={buttonEl}
        onClick={onClickButton}
        complete
      >
        모각코 참여하러 가기
      </CS.SubmitButton>
    </>
  );
};

export default Complete;
