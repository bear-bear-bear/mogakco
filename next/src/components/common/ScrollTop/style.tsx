import styled from '@emotion/styled';
import { FaChevronUp } from 'react-icons/fa';

import media from '@globalStyles/media';

export const ScrollTop = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  z-index: 5000;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  opacity: 0;
  visibility: none;

  ${media.lg} {
    opacity: initial;
    visibility: initial;
  }

  &:hover,
  &:focus {
    transform: scale(1.3);
  }
`;

export const ChevronUp = styled(FaChevronUp)`
  font-size: 1.66rem;
  color: var(--color-yellow-2);
`;
