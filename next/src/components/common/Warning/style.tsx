import styled from '@emotion/styled';

export const Warning = styled.p`
  width: 100%;
  color: var(--color-red-1);
  text-align: right;

  &::before {
    content: '※ ';
  }

  &:first-of-type {
    margin-top: 0.66rem;
  }

  & + & {
    margin-top: 0.33rem;
  }
`;
