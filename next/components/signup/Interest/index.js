import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import {
  saveOptionalInfoRequest,
  signUpRequest,
} from '~/redux/reducers/signup';
import {
  getUserInfo,
  getSkillOptions,
  getJobOptions,
} from '~/redux/selectors/signup';
import Desc from '~/components/common/Desc';
import Form from '~/components/common/Form';
import InputWrapper from '~/components/common/InputWrapper';
import Label from '~/components/common/Label';

import * as CS from '../common/styles';

const Interest = () => {
  const dispatch = useDispatch();
  const [skillIds, setSkillIds] = useState([]);
  const [jobId, setJobId] = useState(0);
  const userInfo = useSelector(getUserInfo);
  const skillOptions = useSelector(getSkillOptions);
  const jobOptions = useSelector(getJobOptions);

  // react-select에서 onChange는 해당 Select에서 선택되어 있는 현재 데이터를 반환합니다.
  const onChangeSkills = useCallback((data) => {
    const isData = data[0]?.id;
    if (!isData) return;

    const nextSkillIds = data.map(({ id }) => id);
    setSkillIds(nextSkillIds);
  }, []);
  const onChangeJob = ({ id: nextJobId }) => {
    if (!nextJobId) return;

    setJobId(nextJobId);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      saveOptionalInfoRequest({
        skills: skillIds,
        job: jobId || null,
      }),
    );
    dispatch(signUpRequest(userInfo));
  };

  return (
    <>
      <CS.Title>관심 분야를 입력하세요</CS.Title>
      <Desc>선택 사항입니다. 입력 시 분야별 랭킹에 이름을 올릴 수 있어요.</Desc>
      <Form action="" onSubmit={onSubmit}>
        <InputWrapper>
          <Label htmlFor="skillIds" direction="bottom">
            개발 분야
          </Label>
          <Select
            closeMenuOnSelect={false}
            isMulti
            isClearable
            options={skillOptions}
            placeholder="개발 분야를 선택해 주세요..."
            onChange={onChangeSkills}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="job" direction="bottom">
            직업
          </Label>
          <Select
            isClearable
            options={jobOptions}
            placeholder="직업을 선택해 주세요..."
            onChange={onChangeJob}
          />
        </InputWrapper>
        <CS.SubmitButton type="submit" complete={false}>
          완료
        </CS.SubmitButton>
      </Form>
    </>
  );
};

export default Interest;
