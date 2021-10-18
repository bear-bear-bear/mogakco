import media from '@globalStyles/media';
import styled from '@emotion/styled';

export const Container = styled.section`
  width: 100%;
  display: grid;
  grid-template:
    'aside' max-content
    'main' max-content/
    1fr;
  gap: 2rem;
  margin-top: 1.66rem;
  padding-left: 1.33rem;
  padding-right: 1.33rem;

  ${media.lg} {
    grid-template:
      'aside main' 1fr /
      12rem 1fr;
  }
`;
