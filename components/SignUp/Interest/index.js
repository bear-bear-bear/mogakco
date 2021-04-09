import React, { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  Container,
  InputWrapper,
  SubmitButton,
  Label,
  Title,
  Form,
} from '../common/styles';

import { Select, Option, WarningText } from './style';

import { verifyInterestRequest } from '~/redux/actions/signup/interest';

const Index = () => {
  const dispatch = useDispatch();
  const [field, setField] = useState(null);
  const [job, setJob] = useState(null);

  const onChangeField = useCallback(e => {
    setField(e.target.value);
  }, []);

  const onChangeJob = useCallback(e => {
    setJob(e.target.value);
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (!field) {
        setField(null);
      }
      if (!job) {
        setJob(null);
      }
      dispatch(verifyInterestRequest(field, job));
    },
    [dispatch, field, job],
  );

  return (
    <Container>
      <Title>관심 분야를 입력하세요</Title>
      <WarningText>
        ! 선택 사항입니다. 입력 시 분야별 랭킹에 이름을 올릴 수 있습니다!
      </WarningText>
      <Form action="" onSubmit={onSubmit}>
        <InputWrapper>
          <Label htmlFor="field">개발 분야</Label>
          <Select id="field" page="interest" onChange={onChangeField}>
            <Option value="">개발 분야를 선택해주세요</Option>
            <Option value="frontend">프론트엔드</Option>
            <Option value="backend">백엔드</Option>
            <Option value="ai">인공지능</Option>
            <Option value="embedded">임베디드</Option>
            <Option value="datascience">데이터과학</Option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="job">직업</Label>
          <Select id="job" page="interest" onChange={onChangeJob}>
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
};

export default React.memo(Index);
