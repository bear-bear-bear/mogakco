import styled from '@emotion/styled';

const CAM_SIZE = '30rem';
export const Container = styled.article`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${CAM_SIZE}, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(${CAM_SIZE}, 1fr));
  grid-auto-rows: ${CAM_SIZE};
  grid-auto-flow: row dense;
  background: var(--color-gray-8);
`;
