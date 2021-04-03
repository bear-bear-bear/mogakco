import React from 'react';
import Link from 'next/link';
import {
  contentWrapperStyles,
  titleStyles,
  SubmitButton,
  linkStyles,
} from '../common/styles';

const index = () => (
  <div css={contentWrapperStyles}>
    <h1 css={titleStyles}>회원가입이 완료되었습니다!</h1>
    <Link href="/" css={linkStyles}>
      <SubmitButton type="submit" complete>
        <a>모각코 참여하러 가기</a>
      </SubmitButton>
    </Link>
  </div>
);

export default index;
