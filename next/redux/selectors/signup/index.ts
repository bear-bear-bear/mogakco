import { createSelector } from '@reduxjs/toolkit';

const selectUserInfo = ({ signup }) => signup.userInfo;
const selectSkills = ({ signup }) => signup.skills;
const selectJobs = ({ signup }) => signup.jobs;

/**
 * @desc Select 라이브러리 props 형식에 맞게 skills와 jobs 데이터를 가공해주는 함수
 */
const toSelectOptions = (arrayOfObject) =>
  arrayOfObject.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

export const getSkillOptions = createSelector(selectSkills, (value) =>
  toSelectOptions(value),
);

export const getJobOptions = createSelector(selectJobs, (value) =>
  toSelectOptions(value),
);

export const getUserInfo = createSelector(selectUserInfo, (value) => value);
