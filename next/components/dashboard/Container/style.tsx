import styled from '@emotion/styled';
import media, {
  mediaScreenSizes as mediaSizes,
} from '@components/globalStyles/media';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${mediaSizes.lg}px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.sm} {
    height: initial;
    flex-direction: row;
    align-items: initial;
    justify-content: space-around;
  }

  ${media.xl} {
    justify-content: space-between;
  }
`;
