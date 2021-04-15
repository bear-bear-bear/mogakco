import styled from '@emotion/styled';
import { RiUser3Line } from 'react-icons/ri';

import Logo from 'assets/svg/logo.svg';
import media from '~/components/globalStyles/media';

export const HeaderContainer = styled.header`
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

export const UserIcon = styled(RiUser3Line)`
  position: relative;
  top: -0.9rem;
  font-size: 2rem;
  cursor: pointer;
`;
