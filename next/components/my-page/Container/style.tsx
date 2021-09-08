import media from '@components/globalStyles/media';
import styled from '@emotion/styled';

export const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template:
    'header' max-content
    'aside' max-content
    'main' max-content/
    1fr;
  gap: 2rem;
  padding-left: 1.33rem;
  padding-right: 1.33rem;

  ${media.lg} {
    grid-template:
      'header header' max-content
      'aside main' 1fr /
      12rem 1fr;
  }
`;
