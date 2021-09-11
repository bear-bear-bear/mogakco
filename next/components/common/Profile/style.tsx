import styled from '@emotion/styled';

interface ProfileModalProps {
  isShow: boolean;
}

export const Profile = styled.article`
  position: relative;
`;

export const LogoWrapper = styled.section`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;

export const ProfileModal = styled.dialog<ProfileModalProps>`
  position: absolute;
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
`;
