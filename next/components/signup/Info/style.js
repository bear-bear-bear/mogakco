import styled from '@emotion/styled';

import { InputWrapper, SubmitButton } from '../common/styles';

export const DescWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const TermWrapper = styled(InputWrapper)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;

  & label {
    margin-bottom: initial !important;
  }
`;

export const CustomSubmitButton = styled(SubmitButton)`
  margin-top: 1rem !important;
`;
