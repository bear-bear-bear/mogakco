import styled from '@emotion/styled';

import Button from '~/components/common/Button';
import media from '~/components/globalStyles/media';

export const MiddleBlockContainer = styled.article`
  padding-top: 12rem;
`;

export const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 30rem;
  /* justify-content: center; */

  & > h3 {
    font-weight: 700;
    font-size: 1.3rem;
    text-align: center;
    word-break: keep-all;
    color: var(--color-gray-4);
  }
  & > h1 {
    margin-top: 1rem;
    font-weight: 700;
    font-size: 2.1rem;
    word-break: keep-all;
    text-align: center;
  }
  & > p {
    margin-top: 1rem;
    font-weight: 400;
    font-size: 1.3rem;
    text-align: center;
    word-break: keep-all;
    padding: 0 1rem;
    line-height: 1.4;

    ${media.sm} {
      padding: 0 1.2rem;
    }
    ${media.md} {
      padding: 0 3rem;
    }
    ${media.lg} {
      padding: 0 1.2rem;
    }
    ${media.xl} {
      padding: 0 3rem;
    }
  }
`;

export const StartButton = styled(Button)`
  max-width: 50%;
  height: 3rem;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding: 1.33rem 2.33rem;

  ${media.sm} {
    width: initial;
  }
`;
