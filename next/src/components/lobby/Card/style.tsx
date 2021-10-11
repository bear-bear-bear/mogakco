import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

import media from '@globalStyles/media';
import type { CardProps, CardAnchorProps, CardButtonProps } from '.';

type IsShow = Pick<CardProps, 'isShow'>;

const fadeInAnimation = keyframes`
  ${'0%'} {
    top: 2rem;
    opacity: 0;
  }

  ${'100%'} {
    top: 0;
    opacity: 100%;
  }
`;
const fadeOutAnimation = keyframes`
  ${'0%'} {
    top: 0;
    opacity: 100%;
    visibility: initial;
  }

  ${'100%'} {
    top: 2rem;
    opacity: 0;
    visibility: hidden;
  }
`;

const cardStyles = ({ isShow }: IsShow) => css`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr max-content max-content;
  padding: 2rem;
  border-top: 1px solid var(--color-gray-1);
  cursor: pointer;
  transition: box-shadow 0.15s ease-in-out;
  animation: ${isShow ? fadeInAnimation : fadeOutAnimation} 0.5s ease-in-out
    forwards;

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

  &:hover,
  &:focus {
    box-shadow: 0 0 1px var(--color-gray-0) inset,
      0 0 4px var(--color-gray-0) inset, 0 0 10px var(--color-gray-0) inset,
      0 0 30px var(--color-gray-0) inset;
  }

  ${media.sm} {
    flex: initial;
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

export const CardAnchor = styled.a<CardAnchorProps>`
  ${cardStyles}
`;
export const CardButton = styled.button<CardButtonProps>`
  // Init button style
  background-color: inherit;
  align-items: initial;
  border: none;

  ${cardStyles}
`;
