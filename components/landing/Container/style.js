import styled from '@emotion/styled';
import media from '~/components/globalStyles/media';

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
  padding: 0.66rem;
  overflow: hidden;

  ${media.lg} {
    padding: 0.66rem 2rem;
  }
`;
