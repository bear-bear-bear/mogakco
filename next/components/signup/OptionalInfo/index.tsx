import React, { useCallback, useState, SyntheticEvent } from 'react';
import Select from '~/components/common/Select';

import { signUpRequest } from '~/redux/reducers/signup';
import { getSkillOptions, getJobOptions } from '~/redux/selectors/signup';
import Desc from '~/components/common/Desc';
import Form from '~/components/common/Form';
import InputWrapper from '~/components/common/InputWrapper';
import Label from '~/components/common/Label';

import * as CS from '../common/styles';
import useAppDispatch from '~/hooks/useAppDispatch';
import useAppSelector from '~/hooks/useAppSelector';

type SelectProps = {
  value: number;
  label: string;
};

const SKILLS_LIMIT = 5;

const OptionalInfo = () => {
  const dispatch = useAppDispatch();
  const signUpLoading = useAppSelector(({ signup }) => signup.signUpLoading);
  const skillOptions = useAppSelector(getSkillOptions);
  const [skillValue, setSkillValue] = useState<SelectProps[]>();
  const [skillIds, setSkillIds] = useState<number[]>([]);
  const [jobId, setJobId] = useState<number>();
  const jobOptions = useAppSelector(getJobOptions);
  const userInfo = useAppSelector(({ signup }) => signup.userInfo);

  // react-select 에서 onChange 는 해당 Select 에서 선택되어 있는 현재 데이터를 반환합니다.
  const onChangeSkills = useCallback((list: SelectProps[]) => {
    if (list.length > SKILLS_LIMIT) {
      return window.alert('5개 이상 선택하실 수 없습니다.');
    }
    const ids = list.map(({ value }) => value);
    setSkillValue(list);
    setSkillIds(ids);
  }, []);

  const onChangeJob = (job: SelectProps) => setJobId(job.value);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      signUpRequest({
        ...userInfo,
        skills: skillIds,
        job: jobId,
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
            value={skillValue}
            options={skillOptions}
            placeholder="관심 분야를 선택해 주세요... (5개까지 선택 가능)"
            onChange={onChangeSkills}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="job" direction="bottom">
            직업
          </Label>
          <Select
            isMulti={false}
            id="job"
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
