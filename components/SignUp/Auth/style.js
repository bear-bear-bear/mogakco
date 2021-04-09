import { css } from '@emotion/react';
import generateStyled from '~/lib/generateStyled';

const bgColors = ['#ffffff', '#000000'];
const fontColors = ['#A07575', '#ffffff'];

export const DescriptionStyles = css`
  font-size: 1.25rem;
`;

const SocialLoginWrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3.25rem;

  a:nth-of-type(1) {
    margin-bottom: 1.25rem;
  }
`;

const SocialAnchorStyles = ({ service }) => css`
  display: flex;
  padding: 0.5rem;
  width: 15rem;
  height: 2.5rem;
  text-decoration: none;
  align-items: center;
  justify-content: flex-start;
  color: ${service === 'google' ? fontColors[0] : fontColors[1]};
  background-color: ${service === 'google' ? bgColors[0] : bgColors[1]};
  border-radius: 0.4rem;
  font-size: 1.125rem;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const GithubImageStyles = css`
  width: 1.75rem;
  height: 1.75rem;
  margin: 0 0.625rem;
`;

const WarningTextStyles = css`
  display: block;
  color: #f23f31;
  margin: 0 auto;
  margin-top: 1.875rem;
`;

// styled-components
export const Description = generateStyled('p', DescriptionStyles);
export const SocialLoginWrapper = generateStyled(
  'div',
  SocialLoginWrapperStyles,
);
export const SocialAnchor = generateStyled('a', SocialAnchorStyles);
export const GithubImg = generateStyled('img', GithubImageStyles);
export const WarningText = generateStyled('span', WarningTextStyles);
