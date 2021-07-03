import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import useIsomorphicLayoutEffect from '@hooks/useIsomorphicLayoutEffect';
import * as CS from '../common/styles';

const End = () => {
  const router = useRouter();
  const buttonEl = useRef<HTMLButtonElement>(null);

  useIsomorphicLayoutEffect(() => {
    buttonEl.current?.focus();
  }, []);

  useEffect(() => {
    // 회원가입 과정에서 사용자가 입력했던 정보 삭제
    window.sessionStorage.clear();
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

export default End;