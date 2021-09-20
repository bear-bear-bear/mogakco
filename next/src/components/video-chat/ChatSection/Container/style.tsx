import styled from '@emotion/styled';
import { HiChevronLeft } from 'react-icons/hi';

export const Container = styled.section`
  /* display: none; */
  display: grid;
  grid-template-rows: [Header] max-content [chatList] 1fr [InputBox] max-content;
  width: 25rem;
  height: 100vh;
  background-color: white;
`;

export const Header = styled.header`
  position: relative;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChatTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: 500;
`;

export const ChatMemberCount = styled.span`
  font-size: 1rem;
  font-weight: 500;
  padding-left: 0.2rem;
`;

export const ChatCloseButton = styled(HiChevronLeft)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;
