import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ChatAnnouncement } from 'typings/chat';

/* announcement */
type AnnounceType = Pick<ChatAnnouncement, 'type'>;

export const AnnouncemnetWrapper = styled.section`
  margin: 1rem auto;

  &:first-of-type,
  & + & {
    margin-top: 0;
  }
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
  font-size: 0.95rem;

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
