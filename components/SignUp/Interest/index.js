import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { verifyInterestRequest } from '~/redux/reducers/signup';

import * as CS from '../common/styles';
import * as S from './style';

const Index = () => {
  const dispatch = useDispatch();
  const [field, setField] = useState(null);
  const [job, setJob] = useState(null);

  const onChangeField = useCallback((e) => {
    setField(e.target.value);
  }, []);

  const onChangeJob = useCallback((e) => {
    setJob(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!field) {
        setField(null);
      }
      if (!job) {
        setJob(null);
      }
      dispatch(verifyInterestRequest({ field, job }));
    },
    [dispatch, field, job],
  );

  return (
    <CS.Container>
      <CS.Title>관심 분야를 입력하세요</CS.Title>
      <S.WarningText>
        ! 선택 사항입니다. 입력 시 분야별 랭킹에 이름을 올릴 수 있습니다!
      </S.WarningText>
      <CS.Form action="" onSubmit={onSubmit}>
        <CS.InputWrapper>
          <CS.Label htmlFor="field">개발 분야</CS.Label>
          <S.Select id="field" page="interest" onChange={onChangeField}>
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
          <S.Select id="job" page="interest" onChange={onChangeJob}>
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
