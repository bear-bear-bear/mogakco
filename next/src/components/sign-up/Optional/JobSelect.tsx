import type { ValueType } from 'react-select';

import type { SelectProps } from '@components/common/Select';
import Select from '@components/common/Select';
import InputWrapper from '@components/common/InputWrapper';
import Label from '@components/common/Label';

interface JobSelectProps {
  options: SelectProps[];
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  defaultValue?: SelectProps; // For use in my-page/account-setting
}
type Job = ValueType<SelectProps, false> | null;

const JobSelect = ({ options, setId, defaultValue }: JobSelectProps) => {
  // react-select 에서 onChange 는 해당 Select 에서 선택되어 있는 현재 데이터를 반환합니다.
  const onChangeJob = (job: Job) => setId(job?.value || null);

  return (
    <InputWrapper>
      <Label htmlFor="job" direction="bottom">
        직업
      </Label>
      <Select
        isMulti={false}
        id="job"
        options={options}
        placeholder="직업을 선택해 주세요..."
        onChange={(data) => {
          onChangeJob(data as Job);
        }}
        defaultValue={defaultValue}
      />
    </InputWrapper>
  );
};

export default JobSelect;
