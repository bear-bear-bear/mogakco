import styled from '@emotion/styled';

export const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15rem;
  margin-top: 5rem;
  background: ${({ theme }) => theme.color['gray-0']};
`;

export const TempText = styled.h3`
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: 0.1rem;
  color: ${({ theme }) => theme.color['gray-3']};
`;
