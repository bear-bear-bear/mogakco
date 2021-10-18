import styled from '@emotion/styled';

export const Aside = styled.aside`
  grid-area: aside;

  & ul {
    display: flex;
    flex-direction: column;
    gap: 1.33rem;
  }

  & li {
    width: fit-content;
    height: 2.5rem;
    padding: 0 0.33rem;
    border-radius: 8px;

    &:hover {
      background-color: ${({ theme }) => theme.color['gray-0']};
    }
  }

  & a {
    display: flex;
    align-items: center;
    height: 100%;
    font-weight: 500;
    font-size: 1.2rem;
    letter-spacing: 0.05rem;
    color: ${({ theme }) => theme.color['black-1']};
    box-sizing: content-box;

    &.active {
      border-bottom: 2px solid ${({ theme }) => theme.color['black-1']};
    }
  }
`;
