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
  z-index: 9999;
  transform: ${({ direction }) =>
    direction === 'left'
      ? `translateX(calc(-100% + ${iconLength}rem))`
      : 'none'};
  display: ${({ isShow }) => (isShow ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1.33rem;
  padding: 1.33rem 1rem;
  box-shadow: 0 0 1px var(--color-gray-2), 0 0 2px var(--color-gray-2);
  border-radius: 16px;
  background-color: var(--color-white);

  .profile-section {
    header {
      color: var(--color-gray-8);
      font-weight: 300;
      font-size: 0.9rem;
      letter-spacing: -0.01rem;
      margin-bottom: 1rem;
      padding: 0 0.33rem;
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
          padding-top: 0.33rem;
          font-size: 1.15rem;
          font-weight: 500;
          letter-spacing: 0.03rem;
          color: var(--color-black);
        }
        &:nth-of-type(2) {
          grid-area: email;
          padding-bottom: 0.33rem;
          letter-spacing: -0.03rem;
          color: var(--color-gray-4);
        }
      }
    }

    &__list {
      button {
        // reset button style
        background-color: inherit;
        border: none;
        outline: none;
        cursor: pointer;
        text-align: start;
      }

      &__item {
        width: 100%;
        display: flex;
        align-items: center;
        height: 2rem;
        font-size: 1.15rem;
        font-weight: 500;
        letter-spacing: 0.03rem;
        color: var(--color-black);
        border-radius: 5px;
        padding: 0 0.33rem;

        &:hover,
        &:focus {
          background-color: var(--color-gray-0);
        }
      }
    }
  }
`;