import styled from '@emotion/styled';
import { css } from '@emotion/react';
import CalendarSvg from '@public/svg/calendar.svg';
import ChatSvg from '@public/svg/conversation.svg';
import UserSvg from '@public/svg/user.svg';

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
export const UserIcon = styled(UserSvg)`
  ${IconStyles}
`;

export const RelativeArea = styled.section`
  position: relative;
`;
export const MemberCount = styled.p`
  position: absolute;
  right: -0.2rem;
  bottom: 0;
  height: 1.3rem;
  width: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: var(--color-white);
  background-color: var(--color-blue-2);
  pointer-events: none;
`;
