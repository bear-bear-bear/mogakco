import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

export const PasswordWrapper = styled.div`
  position: relative;
`;

const eyeStyles = css`
  position: absolute;
  top: 50%;
  right: 1.2rem;
  transform: translate(50%, -50%);
  font-size: 1.2rem;
  color: var(--color-gray-5);
  cursor: pointer;
`;

export const CloseEye = styled(VscEyeClosed)`
  ${eyeStyles};
  top: 55% !important; // OpenEye보다 Y좌표를 살짝 내려줌으로써 클릭했을때 눈 감는 효과
`;

export const OpenEye = styled(VscEye)`
  ${eyeStyles};
`;
