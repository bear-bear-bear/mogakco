import React, { useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import * as CS from '../common/styles';

const Complete = () => {
  const router = useRouter();
  const buttonEl = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    buttonEl.current?.focus();
  }, []);

  const onClickButton = () => {
    // TODO: 모각코 서비스 페이지로 이동
    router.replace('/');
  };

  return (
    <>
      <CS.Title>회원가입이 완료되었습니다!</CS.Title>
      <CS.SubmitButton type="button" ref={buttonEl} onClick={onClickButton}>
        모각코 참여하러 가기
      </CS.SubmitButton>
    </>
  );
};

export default Complete;
