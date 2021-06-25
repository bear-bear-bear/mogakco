import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '~/redux/store/configureStore';
import { IOptionalInfoProps } from '~/typings/auth';

const selectUserInfo = ({ signup }: RootState) => signup.userInfo;
const selectSkills = ({ signup }: RootState) => signup.skills;
const selectJobs = ({ signup }: RootState) => signup.jobs;

/**
 * @desc Select 라이브러리 props 형식에 맞게 skills와 jobs 데이터를 가공해주는 함수
 */
const toSelectOptions = (list: IOptionalInfoProps[] | null) => {
  if (list === null) return [];
  return list.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
};

export const getSkillOptions = createSelector(selectSkills, (value) =>
  toSelectOptions(value),
);

export const getJobOptions = createSelector(selectJobs, (value) =>
  toSelectOptions(value),
);

export const getUserInfo = createSelector(selectUserInfo, (value) => value);
