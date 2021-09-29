import styled from '@emotion/styled';

export const TextArea = styled.textarea`
  width: 100%;
  height: 8.5rem;
  padding: 0.33rem 0.5rem;
  border: none;
  font-size: 1rem;
  font-family: inherit;
  resize: none;
  letter-spacing: -0.01rem;
  color: var(--color-black);
  background-color: inherit;
  line-height: 1.1;

  &::placeholder {
    font-size: inherit;
    font-weight: inherit;
    color: var(--color-gray-3);
    vertical-align: middle;
  }

  &:focus {
    outline: none;
  }
`;
