import styled from '@emotion/styled';

export const Content = styled.div`
  flex: 1;
  display: flex;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 6px;
    height: 10px;
    background-color: ${({ theme }) => theme.color['gray-0']};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color['gray-4']};
  }
`;

export const ScrollifyWrapper = styled.section`
  flex: 1;
  display: flex;
  min-height: min-content; // https://stackoverflow.com/a/21541021
  gap: 1.66rem;
`;
