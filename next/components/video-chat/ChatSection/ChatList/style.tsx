import styled from '@emotion/styled';

export const ChatList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.5rem;

    &-thumb {
      background: var(--color-gray-3);
    }
  }
`;
