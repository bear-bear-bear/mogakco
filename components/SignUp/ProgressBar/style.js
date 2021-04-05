import { css } from '@emotion/react';
import generateStyled from '~/lib/generateStyled';

const ProgressBarWrapperStyles = css`
  height: 0.625rem;
  width: 100%;
  background-color: #e0e0de;
  border-radius: 0.3125rem;
  margin-top: 3.75rem;
`;

const ProgressBarfillerStyles = css`
  height: 100%;
  width: 0%;
  background-color: #6a1b9a;
  border-radius: inherit;
  transition: 1s width ease-in-out;
`;

// styled-components
export const ProgressBarWrapper = generateStyled(
  'div',
  ProgressBarWrapperStyles,
);

export const ProgressBarFiller = generateStyled('div', ProgressBarfillerStyles);
