import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ChatAnnouncement } from 'typings/chat';

interface WriteProps {
  isMyChat: boolean;
}
type AnnounceType = Pick<ChatAnnouncement, 'type'>;

export const AnnouncemnetWrapper = styled.section`
  margin: 1rem auto;

  &:first-of-type,
  & + & {
    margin-top: 0;
  }
`;

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
  font-size: 0.95rem;

  ${announcementColorStyles}
`;

export const Writer = styled.p<WriteProps>`
  width: fit-content;
  color: var(--color-gray-4);
  background-color: ${({ isMyChat }) => (isMyChat ? '#fff8d3' : '#d1f0ff')};

  &::after {
    content: ':';
  }
`;

export const TextContent = styled.p`
  color: var(--color-gray-9);
`;

export const FileContent = styled.article`
  padding: 1.33rem 1rem;
  border-radius: 5px;
  background: var(--color-blue-1);
  cursor: pointer;

  & > p {
    // filename
    &:first-of-type {
      color: var(--color-gray-0);
    }

    // filesize
    &:last-child {
      margin-top: 0.5rem;
      color: var(--color-gray-1);
    }
  }
`;
