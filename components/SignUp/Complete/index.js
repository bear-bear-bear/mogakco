import React from 'react';

import {
  contentWrapperStyles,
  titleStyles,
  SubmitButton,
} from '../common/styles';

const index = () => {
  return (
    <div css={contentWrapperStyles}>
      <h1 css={titleStyles}>회원가입이 완료되었습니다!</h1>
      <SubmitButton type="submit" complete>
        모각코 참여하러 가기
      </SubmitButton>
    </div>
  );
};

export default index;
