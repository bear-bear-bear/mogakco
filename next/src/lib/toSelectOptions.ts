import type { SelectProps } from '@components/common/Select';
import type { IOptionalProps } from 'typings/auth';

/**
 * @desc Select 라이브러리 props 형식에 맞게 skills와 jobs 데이터를 가공해주는 함수
 */
// TODO typings/auth.ts 로 옮기기

const toSelectOptions = (
  options: IOptionalProps[] | IOptionalProps | null,
): SelectProps[] => {
  if (options === null) return [];

  if (!Array.isArray(options)) {
    return [
      {
        value: options.id.toString(),
        label: options.name,
      },
    ];
  }

  return options.map(
    ({ id, name }): SelectProps => ({
      value: id.toString(),
      label: name,
    }),
  );
};

export default toSelectOptions;
