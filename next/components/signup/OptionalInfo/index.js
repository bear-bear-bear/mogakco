import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import {
  saveOptionalInfoRequest,
  signUpRequest,
} from '~/redux/reducers/signup';
import {
  getSkillOptions,
  getJobOptions,
  getUserInfo,
} from '~/redux/selectors/signup';
import Desc from '~/components/common/Desc';
import Form from '~/components/common/Form';
import InputWrapper from '~/components/common/InputWrapper';
import Label from '~/components/common/Label';

import * as CS from '../common/styles';

const SKILLS_LIMIT = 5;

const OptionalInfo = () => {
  const dispatch = useDispatch();
  const [skillIds, setSkillIds] = useState([]);
  const [isExcessSkillIdsNum, setIsExcessSkillIdsNum] = useState(false);
  const [jobId, setJobId] = useState(0);
  const signUpLoading = useSelector(({ signup }) => signup.signUpLoading);
  const skillOptions = useSelector(getSkillOptions);
  const jobOptions = useSelector(getJobOptions);
  const userInfo = useSelector(getUserInfo);
  const saveOptionalInfoDone = useSelector(
    ({ signup }) => signup.saveOptionalInfoDone,
  );

  useEffect(() => {
    // 회원가입 마지막 단계가 끝나면 입력받은 정보로 회원가입
    if (saveOptionalInfoDone) {
      dispatch(signUpRequest(userInfo));
    }
  }, [dispatch, saveOptionalInfoDone, userInfo]);

  // react-select에서 onChange는 해당 Select에서 선택되어 있는 현재 데이터를 반환합니다.
  const onChangeSkills = useCallback((data) => {
    const isData = data[0]?.id;
    if (!isData) return;
    setIsExcessSkillIdsNum(data.length >= SKILLS_LIMIT);

    const nextSkillIds = data.map(({ id }) => id);
    setSkillIds(nextSkillIds);
  }, []);
  const onChangeJob = (data) => {
    if (!data) return;

    setJobId(data.id);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      saveOptionalInfoRequest({
        skills: skillIds || null,
        job: jobId || null,
      }),
    );
  };

  return (
    <>
      <Desc>아래 항목들은 선택 사항입니다.</Desc>
      <Desc>작성하시면 랭킹 시스템에 참여할 수 있어요</Desc>
      <Form action="" onSubmit={onSubmit}>
        <InputWrapper>
          <Label htmlFor="skills" direction="bottom">
            관심 분야
          </Label>
          <Select
            id="skills"
            closeMenuOnSelect={false}
            isMulti
            isClearable
            options={isExcessSkillIdsNum ? [] : skillOptions}
            placeholder="관심 분야를 선택해 주세요... (5개까지 선택 가능)"
            onChange={onChangeSkills}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="job" direction="bottom">
            직업
          </Label>
          <Select
            id="job"
            isClearable
            options={jobOptions}
            placeholder="직업을 선택해 주세요..."
            onChange={onChangeJob}
          />
        </InputWrapper>
        <CS.SubmitButton type="submit" complete={false} loading={signUpLoading}>
          완료
        </CS.SubmitButton>
      </Form>
    </>
  );
};

export default OptionalInfo;
