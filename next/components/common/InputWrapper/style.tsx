import styled from '@emotion/styled';

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 1rem;
  }
`;
