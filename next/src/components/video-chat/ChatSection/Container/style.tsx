import styled from '@emotion/styled';
import { FiChevronLeft } from 'react-icons/fi';

interface ContainerStyleProps {
  isShow: boolean;
}

export const Container = styled.section<ContainerStyleProps>`
  width: 20rem;
  height: 100vh;
  display: ${({ isShow }) => (isShow ? 'grid' : 'none')};
  grid-template-rows: [Header] max-content [chatList] 1fr [InputBox] max-content;
  background-color: var(--color-white);
`;

export const Header = styled.header`
  position: relative;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChatTitle = styled.h1`
  font-size: 1.33rem;
  font-weight: 500;
`;

export const ChatMemberCount = styled.span`
  font-size: 1rem;
  font-weight: 500;
  padding-left: 0.2rem;
`;

export const ChatCloseButton = styled(FiChevronLeft)`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translate(50%, -50%);
  cursor: pointer;
  font-size: 1.8rem;
`;
