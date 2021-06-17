import React, { ComponentProps, VFC } from 'react';
import ReactSelect, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

interface IForwardProps {
  props: ComponentProps<typeof ReactSelect>;
}

type Styles = {
  colourStyles: StylesConfig<any, any>;
};

// TODO: GlobalVariables 적용
const Select: VFC<ComponentProps<typeof ReactSelect>> = (props) => {
  const colourStyles: StylesConfig<any, any> = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'white',
      borderRadius: 0,
      maxWidth: 500,
    }),
    option: (base) => ({
      ...base,
    }),
    singleValue: (base) => ({
      ...base,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      borderRadius: 0,
    }),
    noOptionsMessage: (base) => ({
      ...base,
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      maxWidth: 500,
    }),
    input: (base) => ({
      ...base,
      borderRadius: 0,
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#ffffff',
      border: '1px solid #c9d1d9',
    }),
    multiValueRemove: (base) => ({
      ...base,
      ':hover': {
        backgroundColor: '#f23f31',
        color: '#f0f6fc',
      },
    }),
  };

  return <ForwardMultipleSelect props={props} colourStyles={colourStyles} />;
};

const ForwardMultipleSelect: VFC<IForwardProps & Styles> = ({
  colourStyles,
  props,
}) => {
  return (
    <ReactSelect
      isMulti
      components={animatedComponents}
      placeholder="항목을 선택해주세요"
      classNamePrefix="react-select-container"
      styles={colourStyles}
      noOptionsMessage={() => '항목이 존재하지 않습니다.'}
      {...props}
    />
  );
};

export default Select;
