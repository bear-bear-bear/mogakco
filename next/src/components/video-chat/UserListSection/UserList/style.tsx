import styled from '@emotion/styled';

export const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.66rem;
  margin-top: 0.66rem;
  padding: 0 1.33rem;
`;

export const Item = styled.li`
  min-width: 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: var(--color-gray-0);
`;

export const Numeral = styled.p`
  width: 1.66rem;
  height: 1.66rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.33rem;
  border-radius: 5px;
  font-size: 1.2rem;
  background-color: var(--color-gray-6);
  color: var(--color-white);
`;

export const Nickname = styled.p`
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
