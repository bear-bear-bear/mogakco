import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeInAnimation = keyframes`
  ${'0%'} {
    opacity: 0;
  }

  ${'100%'} {
    opacity: 100%;
  }
`;

export const Container = styled.main`
  position: relative;
  display: flex;

  animation: ${fadeInAnimation} 0.5s ease-in-out forwards;
`;
