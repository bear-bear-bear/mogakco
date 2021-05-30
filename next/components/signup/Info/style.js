import styled from '@emotion/styled';

import { SubmitButton } from '../common/styles';

export const DescWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

export const TermWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
`;

export const CustomSubmitButton = styled(SubmitButton)`
  margin-top: 1rem !important;
`;
