import { useState, useCallback } from 'react';
import type { ValueType } from 'react-select';

import Select from '@components/common/Select';
import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';
import type { SelectProps } from '@components/common/Select';

const SKILLS_LIMIT = 5;

interface Props {
  options: SelectProps[];
  setIds: React.Dispatch<React.SetStateAction<string[] | null>>;
  defaultValue: SelectProps[];
}
type Skills = ValueType<SelectProps, true> | null;

const SkillsSelect = ({ options, setIds, defaultValue }: Props) => {
  const [isShowOptions, setIsShowOptions] = useState<boolean>(true);

  // react-select 에서 onChange 는 해당 Select 에서 선택되어 있는 현재 데이터를 반환합니다.
  const onChangeSkills = useCallback(
    (list: Skills) => {
      setIsShowOptions((list?.length || 0) < SKILLS_LIMIT);
      const ids = list?.map(({ value }) => value) || null;
      setIds(ids);
    },
    [setIds],
  );

  return (
    <InputWrapper>
      <Label htmlFor="skills" direction="bottom">
        관심 분야
      </Label>
      <Select
        id="skills"
        closeMenuOnSelect={false}
        options={isShowOptions ? options : []}
        placeholder="관심 분야를 선택해 주세요... (5개까지 선택 가능)"
        onChange={(data) => {
          onChangeSkills(data as Skills);
        }}
        defaultValue={defaultValue}
      />
    </InputWrapper>
  );
};

export default SkillsSelect;
