import styled from '@emotion/styled';

export const SocialLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;

  a:nth-of-type(1) {
    margin-bottom: 1.25rem;
  }
`;

export const SocialAnchor = styled.a`
  display: flex;
  padding: 0.5rem;
  width: 15rem;
  height: 3rem;
  text-decoration: none;
  align-items: center;
  justify-content: flex-start;
  color: ${(props) =>
    props.service === 'google' ? 'var(--color-red-0)' : 'var(--color-white)'};
  background-color: ${(props) =>
    props.service === 'google'
      ? 'var(--color-white-real)'
      : 'var(--color-black)'};
  border-radius: 0.4rem;
  font-size: 1.125rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.service === 'google'
        ? 'var(--color-gray-0)'
        : 'var(--color-gray-6)'};
  }
`;

export const GithubImg = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  margin: 0 0.625rem;
`;
