import { css } from '@emotion/react';
import generateStyled from '~/lib/generateStyled';

export const LinkStyles = css`
  text-decoration: 0;
  color: inherit;
  cursor: pointer;
`;

const ContainerStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4.875rem;
`;

const FormStyles = css`
  position: relative;
  display: flex;
  width: 54rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.25rem;
`;

const TitleStyles = css`
  font-size: 2.25rem;
  margin-bottom: 5rem;
`;

const SubmitBtnStyles = ({ complete }) => css`
  width: ${!complete ? '11.25rem' : '17rem'};
  height: 3.75rem;
  background-color: #003f88;
  color: #fff;
  font-size: 1.25rem;
  border: none;
  border-radius: 0.625rem;
  outline: 0;
  margin-top: 2.625rem;
  align-self: ${!complete ? 'flex-end' : 'none'};
  cursor: pointer;
`;

const LabelStyles = ({ page }) => css`
  display: block;
  width: ${page !== 'info' ? '100%' : '20.625rem'};
  height: 100%;
  text-align: center;
  line-height: 3rem;
`;

// Input width를 정하기 위한 헬퍼 함수
const selectWidth = (page, id) => {
  if (page !== 'auth') {
    if (id !== 'policy') {
      return '100%';
    }
    return '0.66rem';
  }
  return '40rem';
};

const InputStyles = ({ page, id }) => css`
  width: ${selectWidth(page, id)};
  padding: 0.5rem;
  font-size: 1rem;
  outline: 0;
`;


const InputWrapperStyles = ({ page }) => css`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: ${page !== 'info' ? 'space-between' : 'center'};
  align-items: center;
  padding: 0 10rem;
  margin-bottom: 2.5rem;

  &:nth-last-of-type(1) {
    margin-bottom: 0;
  }
`;

const SignUpPageContainerStyles = css`
  padding: 0 calc(200 / 1000 * 100%);
`;

// styled-components
export const Text = generateStyled('span');
export const Container = generateStyled('div', ContainerStyles);
export const Title = generateStyled('h1', TitleStyles);
export const InputWrapper = generateStyled('div', InputWrapperStyles);
export const Input = generateStyled('input', InputStyles);
export const Label = generateStyled('label', LabelStyles);
export const Form = generateStyled('form', FormStyles);
export const SubmitButton = generateStyled('button', SubmitBtnStyles);
export const SignUpPageContainer = generateStyled(
  'div',
  SignUpPageContainerStyles,
);
