import React from 'react';

import {
  contentWrapperStyles,
  titleStyles,
  inputDivStyles,
  SubmitButton,
  formStyles,
  labelStyles,
  Input,
} from '../common/styles';

import { selectStyles, optionsStyles } from './style';

const index = () => (
  <div css={contentWrapperStyles}>
    <h1 css={titleStyles}>관심 분야를 입력하세요</h1>
    <span style={{ position: 'absolute', top: 65, color: '#f13f31' }}>
      ! 선택 사항입니다. 입력 시 분야별 랭킹에 이름을 올릴 수 있습니다!
    </span>
    <form action="" css={formStyles}>
      <div css={inputDivStyles}>
        <label htmlFor="developementField" css={labelStyles}>
          개발 분야
        </label>
        <Input type="text" id="developementField" page="interest" />
      </div>
      <div css={inputDivStyles}>
        <label htmlFor="job" css={labelStyles}>
          직업
        </label>
        <select id="job" page="interest" css={selectStyles}>
          <option value="" css={optionsStyles}>
            직업을 선택해주세요
          </option>
          <option value="worker" css={optionsStyles}>
            직장인
          </option>
          <option value="student" css={optionsStyles}>
            학생
          </option>
        </select>
      </div>
      <SubmitButton type="submit" complete={false}>
        완료
      </SubmitButton>
    </form>
  </div>
);

export default index;
