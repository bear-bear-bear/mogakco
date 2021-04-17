import React, { useCallback } from 'react';
import Router from 'next/router';
import { Container, Title, SubmitButton } from '../common/styles';

const Index = () => {
  const onClickLogo = useCallback(() => {
    Router.push('/');
  }, []);
  return (
    <Container>
      <Title>회원가입이 완료되었습니다!</Title>
      <SubmitButton type="button" onClick={onClickLogo} complete>
        <a>모각코 참여하러 가기</a>
      </SubmitButton>
    </Container>
  );
};

export default Index;
