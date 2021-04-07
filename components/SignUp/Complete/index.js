import React from 'react';
import Link from 'next/link';
import { Container, Title, SubmitButton, LinkStyles } from '../common/styles';

const Index = () => (
  <Container>
    <Title>회원가입이 완료되었습니다!</Title>
    <Link href="/" css={LinkStyles}>
      <SubmitButton type="submit" complete>
        <a>모각코 참여하러 가기</a>
      </SubmitButton>
    </Link>
  </Container>
);

export default Index;
