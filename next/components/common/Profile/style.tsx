import styled from '@emotion/styled';

interface ProfileModalProps {
  isShow: boolean;
}

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
  transform: translateX(calc(-100% + ${iconLength}rem));
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
`;
