import { css } from '@emotion/react';
import styled from '@emotion/styled';

const bgColors = ['#ffffff', '#000000'];
const fontColors = ['#A07575', '#ffffff'];

export const descriptionStyles = css`
  font-size: 1.25rem;
`;

export const socialWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3.25rem;

  a:nth-of-type(1) {
    margin-bottom: 1.25rem;
  }
`;

const socialBtnStyles = ({ service }) => css`
  display: flex;
  padding: 8px;
  width: 15rem;
  height: 40px;
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

export const Social = styled('a')`
  ${socialBtnStyles}
`;
