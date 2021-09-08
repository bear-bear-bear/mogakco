import styled from '@emotion/styled';

export const Aside = styled.aside`
  grid-area: aside;

  & ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  & li {
    width: 5rem;
    height: 3rem;

    &.active {
      background-color: var(--color-gray-1);
    }

    &:hover {
      background-color: var(--color-gray-0);
    }
  }

  & a {
    display: block;
    width: 100%;
    height: 100%;
    font-weight: 500;
    font-size: 1.2rem;
    letter-spacing: 0.05rem;
    color: var(--color-black);
  }
`;
