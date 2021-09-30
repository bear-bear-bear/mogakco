import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ChatAnnouncement } from 'typings/chat';

/* announcement */
type AnnounceType = Pick<ChatAnnouncement, 'type'>;

export const ChatWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const announcementColorStyles = ({ type }: AnnounceType) => {
  const colors: { [key in AnnounceType['type']]: string } = {
    enter: 'var(--color-gray-5)',
    exit: 'var(--color-gray-5)',
    kick: 'var(--color-red-1)',
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
  background-color: var(--color-gray-0);
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
  color: var(--color-gray-4);
  background-color: ${({ isMyChat }) => (isMyChat ? '#fff8d3' : '#d1f0ff')};

  &::after {
    content: ':';
  }
`;
