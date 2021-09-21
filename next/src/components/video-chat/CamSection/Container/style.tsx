import styled from '@emotion/styled';

const CAM_SIZE = '30rem';
export const Container = styled.section`
  flex: 1;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${CAM_SIZE}, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(${CAM_SIZE}, 1fr));
  grid-auto-rows: ${CAM_SIZE};
  grid-auto-flow: row dense;
  background: var(--color-gray-8);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.5rem;
    background: var(--color-gray-9);

    &-thumb {
      background: var(--color-gray-3);
    }
  }
`;
