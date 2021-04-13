import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '~/components/common/Button';
import media from '~/components/globalStyles/media';

export const LeftBlockContainer = styled.article`
  ${media.lg} {
    padding-top: 2rem;
    padding-left: 1.5rem;
  }

  [class~='ant-row'] {
    // 💥 antd Row 컴포넌트에 대한 스타일 변경
    display: flex;
    justify-content: center;

    ${media.lg} {
      justify-content: initial;
      padding-top: initial;
    }
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
      h1: '4rem',
      h3: '2rem',
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
    h3 {
      margin-top: 1.33rem;
    }
    ${media.sm} {
      h1 {
        white-space: nowrap;
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

  ${media.lg} {
    display: block;
    margin-top: initial;
  }

  h1 {
    font-weight: 700;
    font-size: 2rem;
  }
  h3 {
    margin-top: 1rem;
    font-weight: 400;
    font-size: 1.33rem;
  }

  ${({ firstBlock }) => firstBlock && firstBlockFontStyles}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
  max-width: 35rem;
  height: 3rem;

  ${media.sm} {
    flex-direction: row;
    justify-content: center;
  }

  ${media.lg} {
    max-width: 28rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.66rem 0.33rem;

  ${media.sm} {
    width: initial;
    flex: 1;
  }
`;

export const JoinButton = styled(Button)`
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

export const StartButton = styled(Button)`
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
