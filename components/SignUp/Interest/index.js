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

const index = () => {
  return (
    <div css={contentWrapperStyles}>
      <h1 css={titleStyles}>관심 분야를 입력하세요</h1>
      <form action="" css={formStyles}>
        <div css={inputDivStyles}>
          <label htmlFor="developementField" css={labelStyles}>
            개발 분야
          </label>
          <Input type="text" id="developementField" page="interest" required />
        </div>
        <div css={inputDivStyles}>
          <label htmlFor="job" css={labelStyles}>
            직업
          </label>
          <Input type="text" id="job" page="interest" required />
        </div>
        <SubmitButton type="submit" complete={false}>
          완료
        </SubmitButton>
      </form>
    </div>
  );
};

export default index;
