import styled from '@emotion/styled';

import Button from '../../common/Button';

export const Title = styled.h1`
  font-size: 1.66rem;
  letter-spacing: 0.05rem;
  margin-bottom: 1.33rem;
`;

export const SubTitle = styled.p`
  font-size: 1.1rem;
`;

export const SubmitButton = styled(Button)`
  margin-top: 2rem;
  align-self: ${({ complete }) => (complete ? 'none' : 'flex-end')};

  padding: 1.5rem 1.66rem;
`;
