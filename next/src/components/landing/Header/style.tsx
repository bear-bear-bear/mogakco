import styled from '@emotion/styled';

import Logo from '@public/svg/logo1.svg';
import media from '@globalStyles/media';

export const HeaderContainer = styled.header`
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0.33rem 0.66rem;

  ${media.sm} {
    padding: 1rem;
    padding-right: 0;
  }
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const MainLogo = styled(Logo)`
  cursor: none;
  pointer-events: none;
`;
