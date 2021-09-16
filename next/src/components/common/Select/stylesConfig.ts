import type { StylesConfig } from 'react-select';

const stylesConfig: StylesConfig<any, true> = {
  container: (base) => ({
    ...base,
    width: '100%',
  }),
  control: (base) => ({
    ...base,
    borderRadius: 0,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    borderRadius: 0,
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

export default stylesConfig;
