import React from 'react';

import {
  Container,
  InputWrapper,
  SubmitButton,
  Label,
  Title,
  Form,
  Input,
} from '../common/styles';

import { Select, Option, WarningText } from './style';

const Index = () => (
  <Container>
    <Title>관심 분야를 입력하세요</Title>
    <WarningText>
      ! 선택 사항입니다. 입력 시 분야별 랭킹에 이름을 올릴 수 있습니다!
    </WarningText>
    <Form action="">
      <InputWrapper>
        <Label htmlFor="developementField">개발 분야</Label>
        <Input type="text" id="developementField" page="interest" />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="job">직업</Label>
        <Select id="job" page="interest">
          <Option value="">직업을 선택해주세요</Option>
          <Option value="worker">직장인</Option>
          <Option value="student">학생</Option>
        </Select>
      </InputWrapper>
      <SubmitButton type="submit" complete={false}>
        완료
      </SubmitButton>
    </Form>
  </Container>
);

export default Index;
