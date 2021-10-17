import { keyframes, Theme } from '@emotion/react';
import styled from '@emotion/styled';

import CloseSVG from '@public/svg/cross.svg';
import Button from '@components/common/Button';

export const EditorBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);

  & > div {
    // Editor root
    background-color: ${({ theme }) => theme.color['white-1']};
  }
`;

export const EditorCloseButton = styled(CloseSVG)`
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 1.33rem;
  right: 1.33rem;

  path {
    stroke-width: 3;
    stroke: ${({ theme }: { theme: Theme }) => theme.color['white-1']};
  }

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
`;

const boundAnimation = keyframes`
  ${'0%, 50%, 100%'} {
    transform: scale(1);
  }

  ${'25%'} {
    transform: scale(1.1);
  }

  ${'75%'} {
    transform: scale(1.05);
  }
`;

export const SendButton = styled(Button)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;

  animation: ${boundAnimation} 2s ease-in-out infinite;
`;
