import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '~/components/common/Button';
import media from '~/components/globalStyles/media';

export const LeftBlockContainer = styled.article(({ firstBlock }) => ({
  paddingTop: firstBlock ? '5rem' : '9rem',

  [media.lg]: {
    paddingLeft: firstBlock ? '2.8rem' : '1.5rem',
  },
}));

export const FirstBlockForm = styled.form`
  width: 100%;
  max-width: 30rem;
  height: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

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
      h1: '2.3rem',
      p: '1.5rem',
    },
    sm: {
      h1: '3.2rem',
      p: '1.66rem',
    },
    md: {
      h1: '3.6rem',
      p: '1.8rem',
    },
    lg: {
      h1: '3rem',
      p: '1.6rem',
    },
  };
  const mediaFontSizes = screenSize =>
    `
      ${media[screenSize]} {
        h1 {
          font-size: ${fontSizes[screenSize].h1};
        }
        p {
          font-size: ${fontSizes[screenSize].p};
        }
      }
    `.trim();

  return css`
    p {
      margin-top: 1rem;
      padding: initial;
    }

    ${media.sm} {
      h1 {
        white-space: nowrap;
      }
      p {
        margin-top: 1.33rem;
      }
    }

    ${media.lg} {
      padding-right: initial;
      align-items: initial;

      h1 {
        text-align: initial;
      }
      p {
        text-align: initial;
      }
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
    word-break: keep-all;
  }
  p {
    margin-top: 1rem;
    font-weight: 400;
    font-size: 1.3rem;
    text-align: center;
    word-break: keep-all;
    line-height: 1.4;
    padding: 0 3rem;

    ${media.sm} {
      margin-top: 1rem;
      padding: 0 2.2rem;
    }
    ${media.md} {
      padding: 0 4rem;
    }
    ${media.lg} {
      padding: 0 2.2rem;
    }
    ${media.xl} {
      padding: 0 4rem;
    }
  }
  ${media.lg} {
    margin-top: initial;
    padding-right: 4.5rem;
  }

  ${({ firstBlock }) => firstBlock && firstBlockFontStyles}
`;
