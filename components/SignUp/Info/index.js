import React from 'react';

import {
  Container,
  Title,
  Form,
  InputWrapper,
  Label,
  Input,
  SubmitButton,
} from '../common/styles';

const Index = () => {
  return (
    <Container>
      <Title>이름과 비밀번호를 입력하세요</Title>
      <Form action="">
        <InputWrapper>
          <Label htmlFor="name">이름</Label>
          <Input type="text" id="name" page="info" required />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password">비밀번호</Label>
          <Input type="password" id="password" page="info" required />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
          <Input type="password" id="passwordConfirm" page="info" required />
        </InputWrapper>
        <InputWrapper page="info">
          <Input type="checkbox" id="policy" page="info" required width="" />
          <Label htmlFor="policy" page="info">
            (필수)개인정보 수집 및 이용에 동의하겠습니다.
          </Label>
        </InputWrapper>
        <SubmitButton type="submit" complete={false}>
          계속
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default Index;
