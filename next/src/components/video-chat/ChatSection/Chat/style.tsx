import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface ChatDirection {
  isMyChat: boolean;
}

export const ChatWrapper = styled.section<ChatDirection>`
  display: flex;
  flex-direction: column;
  text-align: ${({ isMyChat }) => (isMyChat ? 'right' : 'left')};
`;

const announcementColorStyles = ({ type }: any) => {
  const colors: { [AnnounceType: string]: string } = {
    enter: 'var(--color-gray-5)',
    exit: 'var(--color-gray-5)',
    kick: 'var(--color-red-1)',
  };

  return css`
    color: ${colors[type]};
  `;
};

export const Announcement = styled.p<{ type: string }>`
  margin: 1rem auto;
  font-size: 0.95rem;

  ${announcementColorStyles}
`;

export const Writer = styled.p`
  color: var(--color-gray-4);
  margin-bottom: 0.5rem;

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
