import styled from '@emotion/styled';

const bgColors = ['#ffffff', '#000000'];
const fontColors = ['#A07575', '#ffffff'];

export const Description = styled.div`
  font-size: 1.25rem;
`;

export const SocialLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3.25rem;

  a:nth-of-type(1) {
    margin-bottom: 1.25rem;
  }
`;

export const SocialAnchor = styled.a(({ service }) => ({
  display: 'flex',
  padding: '0.5rem',
  width: '15rem',
  height: '2.5rem',
  textDecoration: 'none',
  alignItems: 'center',
  justifyContent: 'flex-start',
  color: service === 'google' ? fontColors[0] : fontColors[1],
  backgroundColor: service === 'google' ? bgColors[0] : bgColors[1],
  borderRadius: '0.4rem',
  fontSize: '1.125rem',
  boxShadow: '0 3px 3px rgba(0, 0, 0, 0.5)',
  cursor: 'pointer',
}));

export const GithubImg = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  margin: 0 0.625rem;
`;

export const WarningText = styled.span`
  display: block;
  color: #f23f31;
  margin: 0 auto;
  margin-top: 1.875rem;
`;
