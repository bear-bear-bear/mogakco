import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ChatAnnouncement } from 'typings/chat';

/* announcement */
type AnnounceType = Pick<ChatAnnouncement, 'type'>;

export const ChatWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const announcementColorStyles = ({
  type,
  theme,
}: AnnounceType & { theme: Theme }) => {
  const colors: { [key in AnnounceType['type']]: string } = {
    enter: `${theme.color['gray-5']}`,
    exit: `${theme.color['gray-5']}`,
    kick: `${theme.color['red-1']}`,
  };

  return css`
    color: ${colors[type]};
  `;
};

export const Announcement = styled.p<AnnounceType>`
  margin: 0.5rem auto;
  padding: 0.5rem 0;
  font-size: 0.95rem;
  text-align: center;
  word-break: keep-all;
  line-height: 1.4;
  background-color: ${({ theme }) => theme.color['gray-0']};
  border-radius: 10px;

  &:first-of-type,
  & + & {
    margin-top: 0;
  }

  ${announcementColorStyles}
`;

/* message */
export const MessageWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

interface WriteProps {
  isMyChat: boolean;
}

export const Writer = styled.p<WriteProps>`
  width: fit-content;
  color: ${({ theme }) => theme.color['gray-4']};
  background-color: ${({ isMyChat }) => (isMyChat ? '#fff8d3' : '#d1f0ff')};

  &::after {
    content: ':';
  }
`;
