import styled from '@emotion/styled';

export const fixedScrollWidth = '67.5rem';
export const Container = styled.article`
  width: ${fixedScrollWidth};
  max-width: 100%;
  height: 40rem;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  /* box-sizing: content-box; */
`;
