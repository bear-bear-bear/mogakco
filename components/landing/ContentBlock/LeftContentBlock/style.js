import styled from '@emotion/styled';
import Button from '~/components/common/Button';

export const LeftBlockContainer = styled.article`
  margin-top: 9rem;
`;
export const ContentWrapper = styled.section`
  padding-left: 1rem;
  & > h1 {
    font-weight: 700;
    font-size: ${({ isFirstBlock }) => (isFirstBlock ? '2.5rem' : '2rem')};
  }
  & > h3 {
    margin-top: 1rem;
    font-weight: 400;
    font-size: 1.33rem;
  }
`;

export const Form = styled.form`
  display: flex;
  margin-top: 2rem;
  width: 100%;
  max-width: 28rem;
`;

export const Input = styled.input`
  flex: 1;
  padding: 0 0.33rem;
`;

export const StartButton = styled(Button)`
  max-width: 30rem;
  margin-top: 2rem;
  padding: 1.5rem 0;
  font-size: 1.2rem;
`;

export const JoinButton = styled(Button)`
  padding: 1.33rem 1.66rem;
  margin-left: 0.66rem;
`;
