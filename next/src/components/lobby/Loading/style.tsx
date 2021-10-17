import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { VscLoading } from 'react-icons/vsc';
import type { IconType } from 'react-icons';

const loadingAnimation = keyframes`
  ${'0%'} {
    transform: rotateZ(0deg);
  }

  ${'50%'} {
    transform: rotateZ(400deg);
  }

  ${'100%'} {
    transform: rotateZ(1080deg);
  }
`;

const fadeInAnimation = keyframes`
  ${'0%'} {
    top: calc(50% + 2rem);
    opacity: 0;
  }

  ${'100%'} {
    top: 50%;
    opacity: 100%;
  }
`;

export const Loading = styled<IconType>(VscLoading)`
  width: 3.3rem;
  height: 3.3rem;
  position: absolute;
  top: calc(50% + 2rem);
  left: 48.5%;
  opacity: 0;
  transform: translate(-50%, -50%);
  animation: ${loadingAnimation} 3s cubic-bezier(0.645, 0.045, 0.355, 1)
      infinite,
    ${fadeInAnimation} 0.5s ease-in-out forwards;
  animation-delay: 1.5s;
  color: ${({ theme }) => theme.color['blue-2']};
`;
