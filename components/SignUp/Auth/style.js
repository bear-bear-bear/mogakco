import { css } from '@emotion/react';
import styled from '@emotion/styled';

const bgColors = ['#ffffff', '#000000'];
const fontColors = ['#A07575', '#ffffff'];

export const authWrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4.875rem;
`;

export const titleStyles = css`
  font-size: 2.25rem;
  margin-bottom: 5rem;
`;

export const formStyles = css`
  position: relative;
  display: flex;
  width: 54rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.25rem;
`;

export const inputStyles = css`
  width: 40rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  outline: 0;
`;

export const submitBtnStyles = css`
  width: 11.25rem;
  height: 3.75rem;
  background-color: #003f88;
  color: #fff;
  font-size: 1.25rem;
  border: none;
  border-radius: 0.625rem;
  outline: 0;
  margin-top: 2.625rem;
  align-self: flex-end;
  cursor: pointer;
`;

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

export const SocialComponent = styled('a')`
  ${socialBtnStyles}
`;
