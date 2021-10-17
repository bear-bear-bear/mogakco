import styled from '@emotion/styled';
import type { ProgressBarProps } from './index';

export const ProgressBarWrapper = styled.div`
  height: 0.625rem;
  width: 100%;
  background-color: ${({ theme }) => theme.color['green-0']};
  border-radius: 0.3rem;
  margin-top: 0.66rem;
`;

export const ProgressBarFiller = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.color['blue-1']};
  border-radius: inherit;
  transition: 1s width ease-in-out;

  width: ${({ fill }: ProgressBarProps) => `${fill}%`};
`;
