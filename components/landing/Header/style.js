import styled from '@emotion/styled';

import Logo from 'assets/svg/logo.svg';

export const LandingHeader = styled.header`
  padding: 1rem;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 1.66rem;
`;

export const MainLogo = styled(Logo)`
  cursor: none;
  pointer-events: none;
`;
