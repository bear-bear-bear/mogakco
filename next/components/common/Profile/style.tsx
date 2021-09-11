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

export const ProfileModal = styled.section<ProfileModalProps>`
  width: 18rem;
  max-width: 100vw;
  position: absolute;
  transform: ${({ direction }) =>
    direction === 'left'
      ? `translateX(calc(-100% + ${iconLength}rem))`
      : 'none'};
  display: ${({ isShow }) => (isShow ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1.33rem;
  padding: 1.33rem;
  box-shadow: 0 0 1px var(--color-gray-2), 0 0 2px var(--color-gray-2);
  border-radius: 16px;

  section.profile-section {
    header {
      color: var(--color-gray-8);
      font-weight: 300;
      margin-bottom: 1rem;
    }

    &__account {
      display: grid;
      grid-template:
        'profileImage username' 1fr
        'profileImage email' 1fr
        / max-content 1fr;
      column-gap: 0.33rem;
      align-items: center;

      a {
        grid-area: profileImage;
        width: 4rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color-white);
        background-color: var(--color-blue-1);
        border-radius: 50%;
        font-size: 1.33rem;
      }

      p {
        &:nth-of-type(1) {
          grid-area: username;
          font-size: 1.33rem;
          font-weight: 500;
        }
        &:nth-of-type(2) {
          grid-area: email;
          color: var(--color-gray-4);
          letter-spacing: -0.03rem;
        }
      }
    }

    &__list {
    }
  }
`;
