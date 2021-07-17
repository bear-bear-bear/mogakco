import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import media from '@components/globalStyles/media';

const fadeAnimation = keyframes`
  ${'0%'} {
    opacity: 0;
    top: 2rem;
  }

  ${'100%'} {
    opacity: 100%;
    top: 0;
  }
`;

export const CardAnchor = styled.a`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr max-content max-content;
  margin: 1rem;
  padding: 2rem;
  cursor: pointer;
  transition: box-shadow 0.15s ease-in-out;
  animation: ${fadeAnimation} 0.5s ease-in-out forwards;

  & > h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
    color: var(--color-black);
  }

  & > p {
    font-size: 1.2rem;
    text-align: center;
    color: var(--color-gray-4);
  }

  & + & {
    border-top: 1px solid var(--color-gray-1);
  }

  ${media.sm} {
    width: 22rem;
    max-width: 100%;
    height: 28rem;
    border: 1px solid var(--color-gray-1);

    &:hover,
    &:focus {
      box-shadow: 0 0 1px var(--color-gray-0), 0 0 4px var(--color-gray-0),
        0 0 10px var(--color-gray-0), 0 0 30px var(--color-gray-0);
    }
  }
`;
