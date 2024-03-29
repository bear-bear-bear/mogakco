import { css, Theme } from '@emotion/react';
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

interface ISocialAnchorColorStyles {
  service: 'google' | 'github';
}
const socialAnchorColorStyles = ({
  service,
  theme,
}: ISocialAnchorColorStyles & { theme: Theme }) => {
  const styles = {
    google: css`
      color: ${theme.color['black-1']};
      background-color: ${theme.color['white-0']};
      border: 1px solid black;

      &:hover,
      &:focus {
        background-color: ${theme.color['gray-0']};
        color: ${theme.color['black-1']};
      }

      &:active {
        background-color: ${theme.color['gray-1']};
      }
    `,
    github: css`
      color: ${theme.color['white-1']};
      background-color: ${theme.color['black-1']};

      &:hover,
      &:focus {
        background-color: ${theme.color['gray-7']};
        color: ${theme.color['white-1']};
      }

      &:active {
        background-color: ${theme.color['gray-9']};
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
  background-color: ${({ theme }) => theme.color['gray-1']};
`;

export const SubmitButton = styled(Button)`
  margin-top: 1rem;
  padding: 1.66rem 1.33rem;
`;
