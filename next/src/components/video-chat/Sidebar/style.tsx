import styled from '@emotion/styled';
import { css } from '@emotion/react';
import CalendarSvg from '@public/svg/calendar.svg';
import ChatSvg from '@public/svg/conversation.svg';

export const Sidebar = styled.aside`
  width: 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  background-color: var(--color-gray-0);
  border-right: 1px solid var(--color-gray-1);
`;

export const BottomSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.66rem;
`;

const IconStyles = css`
  width: 3rem;
  height: auto;
  cursor: pointer;
  border-radius: 15px;

  &:hover,
  &:focus {
    background-color: var(--color-gray-1);
  }
`;

export const CalendarIcon = styled(CalendarSvg)`
  ${IconStyles}
`;
export const ChatIcon = styled(ChatSvg)`
  ${IconStyles}
`;
