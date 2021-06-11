import styled from '@emotion/styled';
import { VscClose } from 'react-icons/vsc';

export const EmailWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const DeleteButton = styled(VscClose)`
  position: absolute;
  top: 50%;
  right: 1.2rem;
  transform: translate(50%, -50%);
  cursor: pointer;
  font-size: 1.1rem;
  color: var(--color-gray-4);
`;
