import React, { useCallback, useState, SyntheticEvent } from 'react';
import { OptionsType } from 'react-select';

import useTypedDispatch from '@hooks/useTypedDispatch';
import useTypedSelector from '@hooks/useTypedSelector';
import { signUpRequest } from '@redux/reducers/signup';
import { getSkillOptions, getJobOptions } from '@redux/selectors/signup';
import Select from '@components/common/Select';
import Desc from '@components/common/Desc';
import Form from '@components/common/Form';
import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';

import * as CS from '../common/styles';

type SelectProps = {
  value: number;
  label: string;
};

const SKILLS_LIMIT = 5;

const OptionalInfo = () => {
  const dispatch = useTypedDispatch();
  const signUpLoading = useTypedSelector(({ signup }) => signup.signUpLoading);
  const skillOptions = useTypedSelector(getSkillOptions);
  const [skillIds, setSkillIds] = useState<number[]>([]);
  const [isShowSkillOptions, setIsShowSkillOptions] = useState<boolean>(true);
  const [jobId, setJobId] = useState<number>();
  const jobOptions = useTypedSelector(getJobOptions);
  const userInfo = useTypedSelector(({ signup }) => signup.userInfo);

  // react-select 에서 onChange 는 해당 Select 에서 선택되어 있는 현재 데이터를 반환합니다.
  const onChangeSkills = useCallback((list: OptionsType<SelectProps>) => {
    setIsShowSkillOptions(list?.length < SKILLS_LIMIT);
    const ids = list?.map(({ value }) => value);
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
            options={isShowSkillOptions ? skillOptions : []}
            placeholder="관심 분야를 선택해 주세요... (5개까지 선택 가능)"
            onChange={(data) => {
              onChangeSkills(data as OptionsType<SelectProps>);
            }}
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
            onChange={(data) => {
              onChangeJob(data as SelectProps);
            }}
          />
        </InputWrapper>
        <CS.SubmitButton type="submit" $loading={signUpLoading}>
          완료
        </CS.SubmitButton>
      </Form>
    </>
  );
};

export default OptionalInfo;
