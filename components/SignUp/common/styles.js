import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const contentWrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4.875rem;
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

export const titleStyles = css`
  font-size: 2.25rem;
  margin-bottom: 5rem;
`;

export const submitBtnStyles = ({ complete }) => css`
  width: ${!complete ? '11.25rem' : '17rem'};
  height: 3.75rem;
  background-color: #003f88;
  color: #fff;
  font-size: 1.25rem;
  border: none;
  border-radius: 0.625rem;
  outline: 0;
  margin-top: 2.625rem;
  align-self: ${!complete ? 'flex-end' : 'none'};
  cursor: pointer;
`;

export const subjectStyles = css`
  font-size: 1.5rem;
`;

export const labelStyles = css`
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 48px;
`;

const inputStyles = ({ page }) => css`
  width: ${page === 'auth' ? '40rem' : '25.625rem'};
  padding: 0.5rem;
  font-size: 1.5rem;
  outline: 0;
`;

export const inputDivStyles = css`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10rem;
  margin-bottom: 2.5rem;

  &:nth-last-of-type(1) {
    margin-bottom: 0;
  }
`;

// styled-components
export const Input = styled('input')`
  ${inputStyles}
`;

export const SubmitButton = styled('button')`
  ${submitBtnStyles}
`;
