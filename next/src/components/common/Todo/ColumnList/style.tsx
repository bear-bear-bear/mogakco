import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

export const scrollStyles = ({ theme }: { theme: Theme }) => css`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: ${theme.color['gray-0']};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.color['gray-4']};
  }
`;

export const ColumnList = styled.ul`
  flex: 1;
  white-space: nowrap;
  width: 100%;
  overflow: scroll hidden;

  ${scrollStyles}
`;
