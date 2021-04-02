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
        <div css={inputDivStyles} style={{ 'justify-content': 'center' }}>
          <Input
            type="checkbox"
            id="policy"
            page="info"
            required
            style={{ width: '10px' }}
          />
          <label htmlFor="policy" css={labelStyles} style={{ width: '330px' }}>
            (필수)개인정보 수집 및 이용에 동의하겠습니다.
          </label>
        </div>
        <SubmitButton type="submit" complete={false}>
          계속
        </SubmitButton>
      </form>
    </div>
  );
};

export default index;
