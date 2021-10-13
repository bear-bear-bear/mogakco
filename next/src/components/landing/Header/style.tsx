import styled from '@emotion/styled';

import Logo from '@public/svg/logo1.svg';
import media from '@globalStyles/media';

export const Container = styled.header`
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0.33rem 0.66rem;

  ${media.sm} {
    padding: 1rem;
  }
`;

export const ButtonsWrapper = styled.section`
  width: fit-content;
  display: flex;
  gap: 0.66rem;
`;

export const MainLogo = styled(Logo)`
  cursor: none;
  pointer-events: none;
`;
