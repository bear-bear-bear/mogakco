import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { saveOptionalInfoRequest } from '~/redux/reducers/signup';
import Desc from '~/components/common/Desc';
import Form from '~/components/common/Form';
import InputWrapper from '~/components/common/InputWrapper';
import Label from '~/components/common/Label';

import * as CS from '../common/styles';
import * as S from './style';

const Interest = () => {
  const dispatch = useDispatch();
  const fieldEl = useRef(null);
  const jobEl = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const field = fieldEl.current.value || null;
    const job = jobEl.current.value || null;
    dispatch(saveOptionalInfoRequest({ field, job }));
  };

  return (
    <>
      <CS.Title>관심 분야를 입력하세요</CS.Title>
      <Desc>선택 사항입니다. 입력 시 분야별 랭킹에 이름을 올릴 수 있어요.</Desc>
      <Form action="" onSubmit={onSubmit}>
        <InputWrapper>
          <Label htmlFor="field" direction="bottom">
            개발 분야
          </Label>
          <S.Select id="field" ref={fieldEl}>
            <S.Option value="">개발 분야를 선택해주세요</S.Option>
            <S.Option value="frontend">프론트엔드</S.Option>
            <S.Option value="backend">백엔드</S.Option>
            <S.Option value="ai">인공지능</S.Option>
            <S.Option value="embedded">임베디드</S.Option>
            <S.Option value="datascience">데이터과학</S.Option>
          </S.Select>
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="job" direction="bottom">
            직업
          </Label>
          <S.Select id="job" ref={jobEl}>
            <S.Option value="">직업을 선택해주세요</S.Option>
            <S.Option value="worker">직장인</S.Option>
            <S.Option value="student">학생</S.Option>
          </S.Select>
        </InputWrapper>
        <CS.SubmitButton type="submit" complete={false}>
          완료
        </CS.SubmitButton>
      </Form>
    </>
  );
};

export default Interest;
