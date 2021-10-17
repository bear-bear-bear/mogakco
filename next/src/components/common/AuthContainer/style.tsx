import styled from '@emotion/styled';
import media from '@globalStyles/media';

export const OuterContainer = styled.main`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
  align-items: center;

  ${media.lg} {
    max-width: 33rem;
    min-height: 20rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem;
    border: 1px solid ${({ theme }) => theme.color['gray-1']};
    border-radius: 5px;
  }
`;

export const InnerContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  padding-right: 1rem;
  padding-left: 1rem;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 0.33rem;
  padding-bottom: 0.33rem;
`;

export const LogoWrapper = styled.div`
  width: 9rem;
  cursor: pointer;
`;
