import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { VscEye, VscEyeClosed, VscClose } from 'react-icons/vsc';

/* ********************* */
/* default */
/* ********************* */
const defaultInputStyles = ({ scale }: { scale: 'small' | 'medium' }) => {
  const scales = {
    small: {
      fontSize: '1rem',
      padding: '0.5rem 0.4rem',
    },
    medium: {
      fontSize: '1.1rem',
      padding: '0.75rem 0.66rem',
    },
  };
  const { fontSize, padding } = scales[scale];

  return css`
    width: 100%;
    font-size: ${fontSize};
    padding: ${padding};
    outline: none;
  `;
};

export const DefaultInput = styled.input`
  ${defaultInputStyles}
`;

export const RelativeWrapper = styled.div`
  // 상호작용하는 버튼이 있다면 Input과 묶어두기 위해 사용
  width: 100%;
  position: relative;
`;

const buttonStyles = css`
  position: absolute;
  top: 50%;
  right: 1.2rem;
  transform: translate(50%, -50%);
  color: var(--color-gray-5);
  cursor: pointer;
`;

/* ********************* */
/* type = password */
/* ********************* */
export const CloseEye = styled(VscEyeClosed)`
  ${buttonStyles};
  font-size: 1.2rem;
  top: 55% !important; // OpenEye보다 Y좌표를 살짝 내려줌으로써 클릭했을때 눈 감는 효과
`;

export const OpenEye = styled(VscEye)`
  ${buttonStyles};
  font-size: 1.2rem;
`;

/* ********************* */
/* type = email */
/* ********************* */
export const DeleteButton = styled(VscClose)`
  ${buttonStyles};
  font-size: 1.1rem;
`;

/* ********************* */
/* type = checkbox */
/* ********************* */
export const CheckboxInput = styled.input`
  &[type='checkbox'] {
    transform: scale(1.5);
  }
`;
