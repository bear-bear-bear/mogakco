import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { verifyInterestRequest } from '~/redux/reducers/signup';

import * as CS from '../common/styles';
import * as S from './style';

const Index = () => {
  const dispatch = useDispatch();
  const fieldEl = useRef(null);
  const jobEl = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const field = fieldEl.current.value || null;
    const job = jobEl.current.value || null;
    dispatch(verifyInterestRequest({ field, job }));
  };

  return (
    <CS.Container>
      <CS.Title>관심 분야를 입력하세요</CS.Title>
      <CS.Description>
        선택 사항입니다. 입력 시 분야별 랭킹에 이름을 올릴 수 있어요.
      </CS.Description>
      <CS.Form action="" onSubmit={onSubmit}>
        <CS.InputWrapper>
          <CS.Label htmlFor="field">개발 분야</CS.Label>
          <S.Select id="field" ref={fieldEl}>
            <S.Option value="">개발 분야를 선택해주세요</S.Option>
            <S.Option value="frontend">프론트엔드</S.Option>
            <S.Option value="backend">백엔드</S.Option>
            <S.Option value="ai">인공지능</S.Option>
            <S.Option value="embedded">임베디드</S.Option>
            <S.Option value="datascience">데이터과학</S.Option>
          </S.Select>
        </CS.InputWrapper>
        <CS.InputWrapper>
          <CS.Label htmlFor="job">직업</CS.Label>
          <S.Select id="job" ref={jobEl}>
            <S.Option value="">직업을 선택해주세요</S.Option>
            <S.Option value="worker">직장인</S.Option>
            <S.Option value="student">학생</S.Option>
          </S.Select>
        </CS.InputWrapper>
        <CS.SubmitButton type="submit" complete={false}>
          완료
        </CS.SubmitButton>
      </CS.Form>
    </CS.Container>
  );
};

export default Index;
