import styled from '@emotion/styled';
import { ProfileModalProps } from './ProfileModal';

const iconLength = 3;
export const Profile = styled.article`
  width: ${iconLength}rem;
  height: ${iconLength}rem;
  position: relative;
`;

export const LogoWrapper = styled.section`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const ProfileModal = styled.dialog<ProfileModalProps>`
  width: 16rem;
  max-width: 100vw;
  position: absolute;
  transform: ${({ direction }) =>
    direction === 'left'
      ? `translateX(calc(-100% + ${iconLength}rem))`
      : 'none'};
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
`;
