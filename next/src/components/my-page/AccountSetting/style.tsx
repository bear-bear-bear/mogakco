import styled from '@emotion/styled';
import _Input from '@components/common/Input';
import _Form from '@components/common/Form';
import media from '@globalStyles/media';

const FOOTER_HEIGHT = '5rem';
const PARENT_BREAKPOINT = media.lg;

export const Main = styled.main`
  grid-area: main;
  padding-bottom: ${FOOTER_HEIGHT};

  header {
    margin-bottom: 1.33rem;
  }
`;

export const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: 500;
`;

export const Form = styled(_Form)`
  position: relative;

  ${PARENT_BREAKPOINT} {
    max-width: 30rem;
  }
`;

export const Input = styled(_Input)`
  border-radius: 10px;
`;

export const DevideTextLine = styled.p`
  display: flex;
  align-items: center;
  margin-top: 4rem;
  margin-bottom: 1.33rem;
  padding-left: 0.33rem;
  padding-right: 0.33rem;
  color: ${({ theme }) => theme.color['gray-3']};
  background-color: ${({ theme }) => theme.color['white-1']};

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.color['gray-3']};
  }
`;

export const HiddenButton = styled.button`
  visibility: hidden;
  opacity: 0;
  padding-left: 0;
  padding-right: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

export const Footer = styled.footer`
  width: 100%;
  height: ${FOOTER_HEIGHT};
  position: fixed; // relative to <body>
  left: 0;
  bottom: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: ${({ theme }) => theme.color['gray-0']};

  button {
    position: absolute;
    top: 50%;
    left: calc(100% - 3.5rem);
    transform: translate(-50%, -50%);

    ${PARENT_BREAKPOINT} {
      left: 66%;
    }
  }
`;
