import type { IOptionalProps } from 'typings/auth';

/**
 * @desc Select 라이브러리 props 형식에 맞게 skills와 jobs 데이터를 가공해주는 함수
 */
export type SelectProps = {
  value: number;
  label: string;
};
const toSelectOptions = (list: IOptionalProps[] | null) => {
  if (list === null) return [];

  return list.map(
    ({ id, name }): SelectProps => ({
      value: id,
      label: name,
    }),
  );
};

export default toSelectOptions;
