import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Logo from 'assets/svg/logo.svg';

export const LandingHeader = styled.header`
  border: 1px solid royalblue;
  padding: 1rem;
`;

const buttonStyles = css`
  min-width: fit-content;
  height: fit-content;
  position: relative;
  padding: 0.66rem 1.33rem;
  font-size: 1.15rem;
  letter-spacing: -0.02rem;

  &:hover {
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-bottom: 2px solid black;
    }
  }
`;
export const ButtonsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
export const AuthButton = styled.div`
  ${buttonStyles};

  &:nth-child(1) {
    margin-right: 0.2rem;
  }
`;
export const StartButton = styled.div`
  ${buttonStyles};
`;

export const MainLogo = styled(Logo)`
  cursor: none;
  pointer-events: none;
`;
