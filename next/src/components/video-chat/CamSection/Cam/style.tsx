import styled from '@emotion/styled';

export const Cam = styled.article`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color['gray-7']};
  border: 1px solid ${({ theme }) => theme.color['gray-6']};
`;

export const CamWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color['gray-8']};
`;
