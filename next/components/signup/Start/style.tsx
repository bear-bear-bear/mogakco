import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FcGoogle } from 'react-icons/fc';
import { VscGithubInverted } from 'react-icons/vsc';

import Button from '@components/common/Button';

export const SocialLoginWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const socialAnchorColorStyles = ({ service }) => {
  const styles = {
    google: css`
      color: var(--color-black);
      background-color: var(--color-white-real);
      border: 1px solid black;

      &:hover,
      &:focus {
        background-color: var(--color-gray-0);
        color: var(--color-black);
      }

      &:active {
        background-color: var(--color-gray-1);
      }
    `,
    github: css`
      color: var(--color-white);
      background-color: var(--color-black);

      &:hover,
      &:focus {
        background-color: var(--color-gray-7);
        color: var(--color-white);
      }

      &:active {
        background-color: var(--color-gray-9);
      }
    `,
  };

  return styles[service];
};

export const SocialAnchor = styled.a`
  width: 100%;
  height: 3.32rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;

  ${socialAnchorColorStyles}

  &:nth-of-type(2) {
    margin-top: 1rem;
  }
`;

export const GoogleIcon = styled(FcGoogle)`
  font-size: 1.33rem;
  margin-right: 0.33rem;
`;

export const GithunIcon = styled(VscGithubInverted)`
  font-size: 1.2rem;
  margin-right: 0.33rem;
`;

export const DevideLine = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: var(--color-gray-1);
`;

export const SubmitButton = styled(Button)`
  margin-top: 1rem;
  padding: 1.66rem 1.33rem;
`;
