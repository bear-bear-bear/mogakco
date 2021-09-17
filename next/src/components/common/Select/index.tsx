import React, { ComponentProps, VFC } from 'react';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';

import stylesConfig from './stylesConfig';

export interface SelectProps {
  label: string;
  value: string;
}

type Props = ComponentProps<typeof ReactSelect>;

const MultipleSelect = (props: Props) => (
  <ReactSelect
    isMulti
    components={makeAnimated()}
    placeholder="항목을 선택해주세요"
    classNamePrefix="react-select-container"
    styles={stylesConfig}
    noOptionsMessage={() => '항목이 존재하지 않습니다.'}
    {...props}
  />
);

export default MultipleSelect;
