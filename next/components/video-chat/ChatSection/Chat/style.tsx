import styled from '@emotion/styled';

export const Announcement = styled.p`
  margin: 0 auto;
`;

export const ChatWrapper = styled.section`
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 0.66rem;
    margin-bottom: 0.66rem;
  }
`;
