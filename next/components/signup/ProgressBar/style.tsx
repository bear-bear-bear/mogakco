import styled from '@emotion/styled';
import { css } from '@emotion/react';
import type { ProgressBarProps } from './index';

export const ProgressBarWrapper = styled.div`
  height: 0.625rem;
  width: 100%;
  background-color: var(--color-green-0);
  border-radius: 0.3rem;
  margin-top: 0.66rem;
`;

const fillStyles = ({ fill }: ProgressBarProps) => {
  // 진행도 = (진행 완료된 절차 갯수 / 전체 절차 갯수) * 100
  const progress = (fill.filter((v) => v === true).length / fill.length) * 100;

  return css`
    width: ${progress.toFixed(2)}%;
  `;
};

export const ProgressBarFiller = styled.div`
  height: 100%;
  background-color: var(--color-blue-1);
  border-radius: inherit;
  transition: 1s width ease-in-out;

  ${fillStyles}
`;
