import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Button from '../../common/Button';
import media from '../../globalStyles/media';

export const WarningText = styled.p`
  width: 100%;
  color: var(--color-red-1);
  text-align: right;

  &::before {
    content: '※ ';
  }

  &:first-of-type {
    margin-top: 0.66rem;
  }

  & + & {
    margin-top: 0.33rem;
  }
`;

export const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  padding-right: 1rem;
  padding-left: 1rem;
`;

export const Form = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.66rem;
  letter-spacing: 0.05rem;
  margin-bottom: 1.33rem;
`;

export const SubTitle = styled.p`
  font-size: 1.1rem;
`;

const descSizeStyles = ({ size = 'medium' }) => {
  const sizes = {
    small: css`
      font-size: 0.95rem;
      line-height: 1.2;

      & + & {
        margin-top: 0.8rem;
      }
    `,
    medium: css`
      font-size: 1.05rem;
      line-height: 1.5;

      & + & {
        margin-top: 1rem;
      }
    `,
  };

  return sizes[size];
};

export const Description = styled.p`
  color: var(--color-gray-4);

  // size style
  ${descSizeStyles}
`;

export const SubmitButton = styled(Button)`
  margin-top: 2rem;
  align-self: ${({ complete }) => (complete ? 'none' : 'flex-end')};

  padding: 1.5rem 1.66rem;
`;

export const InputWrapper = styled.div`
  width: 100%;

  & + & {
    margin-top: 1rem;
  }
`;

const inputSizeStyles = ({ size = 'medium' }) => {
  const sizes = {
    small: css`
      padding: 0.5rem 0.4rem;
      font-size: 1rem;
    `,
    medium: css`
      padding: 0.75rem 0.66rem;
      font-size: 1.1rem;
    `,
  };

  return sizes[size];
};

export const Input = styled.input`
  width: 100%;

  ${inputSizeStyles}
`;

export const CheckBox = styled.input`
  &[type='checkbox'] {
    margin-right: 0.66rem;
    transform: scale(1.5);
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.33rem;
  font-size: 1.05rem;
  line-height: 1.3;
`;

export const SignUpPageContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
  align-items: center;

  ${media.lg} {
    max-width: 33rem;
    min-height: 20rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem;
    border: 1px solid var(--color-gray-1);
    border-radius: 5px;
  }
`;
