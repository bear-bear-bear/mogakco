import React from 'react';

import {
  contentWrapperStyles,
  titleStyles,
  inputDivStyles,
  submitBtnStyles,
  formStyles,
  labelStyles,
  Input,
} from '../common/styles';

const index = () => {
  return (
    <div css={contentWrapperStyles}>
      <h1 css={titleStyles}>이름과 비밀번호를 입력하세요</h1>
      <form action="" css={formStyles}>
        <div css={inputDivStyles}>
          <label htmlFor="name" css={labelStyles}>
            이름
          </label>
          <Input type="text" id="name" page="info" required />
        </div>
        <div css={inputDivStyles}>
          <label htmlFor="password" css={labelStyles}>
            비밀번호
          </label>
          <Input type="password" id="password" page="info" required />
        </div>
        <div css={inputDivStyles}>
          <label htmlFor="passwordConfirm" css={labelStyles}>
            비밀번호 확인
          </label>
          <Input type="password" id="passwordConfirm" page="info" required />
        </div>
        <button type="submit" css={submitBtnStyles}>
          계속
        </button>
      </form>
    </div>
  );
};

export default index;
