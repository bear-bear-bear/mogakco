import styled from '@emotion/styled';
import _Input from '@components/common/Input';
import _Form from '@components/common/Form';
import media from '@globalStyles/media';

const FOOTER_HEIGHT = '5rem';

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
  // my-page Container의 breakpoint에 맞춤
  ${media.lg} {
    max-width: 30rem;
  }
`;

export const Input = styled(_Input)`
  border-radius: 10px;
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: var(--color-gray-0);
`;
