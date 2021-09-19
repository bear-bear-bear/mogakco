import styled from '@emotion/styled';
import media, { mediaBreakpoints } from '@globalStyles/media';
import { pageHeaderHeight } from '@components/common/ServiceHeader/style';

export const Container = styled.main`
  width: 100%;
  height: calc(100vh - ${pageHeaderHeight});
  max-width: ${mediaBreakpoints.lg}px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.sm} {
    height: initial;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    flex-direction: row;
    align-items: initial;
    justify-content: space-around;
  }

  ${media.xl} {
    justify-content: space-between;
  }
`;
