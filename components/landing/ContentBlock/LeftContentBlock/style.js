import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '~/components/common/Button';
import media from '~/components/globalStyles/media';

export const LeftBlockContainer = styled.article`
  padding-top: ${({ firstBlock }) => (firstBlock ? 'initial' : '9rem')};

  ${media.lg} {
    padding-left: 1.5rem;
  }
`;

export const FirstBlockForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
  height: 3rem;

  ${media.sm} {
    flex-direction: row;
    justify-content: center;
    max-width: 35rem;
  }

  ${media.lg} {
    max-width: 28rem;
  }
`;

export const FirstBlockInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.66rem 0.33rem;

  ${media.sm} {
    width: initial;
    flex: 1;
  }
`;

export const FirstBlockJoinButton = styled(Button)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.33rem;
  padding: 1.33rem 1.66rem;

  ${media.sm} {
    width: initial;
    margin-top: initial;
    margin-left: 0.66rem;
  }
`;

export const FirstBlockStartButton = styled(Button)`
  max-width: 30rem;
  margin-top: 2rem;
  padding: 1.5rem 0;
  font-size: 1.2rem;

  ${media.md} {
    max-width: 33rem;
    padding: 1.66rem 0;
    font-size: 1.5rem;
  }

  ${media.lg} {
    max-width: 30rem;
    padding: 1.5rem 0;
    font-size: 1.2rem;
  }
`;

const firstBlockFontStyles = () => {
  const fontSizes = {
    xs: {
      h1: '2.1rem',
      h3: '1.33rem',
    },
    sm: {
      h1: '3.2rem',
      h3: '1.66rem',
    },
    md: {
      h1: '3.6rem',
      h3: '1.8rem',
    },
    lg: {
      h1: '3rem',
      h3: '1.6rem',
    },
  };
  const mediaFontSizes = screenSize =>
    `
      ${media[screenSize]} {
        h1 {
          font-size: ${fontSizes[screenSize].h1};
        }
        h3 {
          font-size: ${fontSizes[screenSize].h3};
        }
      }
    `.trim();

  return css`
    align-items: initial;

    h1 {
      text-align: initial;
      ${media.sm} {
        white-space: nowrap;
      }
    }
    h3 {
      margin-top: 1.33rem;
      text-align: initial;
      padding: initial;
    }

    ${media.lg} {
      padding-right: initial;
    }

    ${mediaFontSizes('xs')}
    ${mediaFontSizes('sm')}
    ${mediaFontSizes('md')}
    ${mediaFontSizes('lg')}
  `;
};

export const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;

  h1 {
    font-weight: 700;
    font-size: 2.1rem;
    text-align: center;
  }
  h3 {
    margin-top: 1rem;
    font-weight: 400;
    font-size: 1.3rem;
    text-align: center;
    word-break: keep-all;
    line-height: 1.4;
    padding: 0 1rem;

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
  ${media.lg} {
    margin-top: initial;
    padding-right: 4.5rem;
  }

  ${({ firstBlock }) => firstBlock && firstBlockFontStyles}
`;
