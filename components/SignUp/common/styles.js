import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Text = styled.span``;

export const LinkStyles = css`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
`;

export const Form = styled.form`
  position: relative;
  display: flex;
  width: 54rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.25rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2.5rem;
`;

export const SubmitButton = styled.button(({ complete }) => ({
  width: !complete ? '10rem' : '17rem',
  height: '3.75rem',
  backgroundColor: '#003f88',
  color: '#fff',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '0.625rem',
  outline: 0,
  marginTop: '2.625rem',
  alignSelf: !complete ? 'flex-end' : 'none',
  cursor: 'pointer',
}));

export const Label = styled.label(({ htmlFor }) => ({
  display: 'block',
  width: htmlFor !== 'policy' ? '6rem' : 'fit-content',
  height: '100%',
  textAlign: 'right',
  lineHeight: '3rem',
  marginRight: '0.8rem',
}));

// Input width를 정하기 위한 헬퍼 함수
const selectWidth = (page, id) => {
  if (page !== 'auth') {
    if (id !== 'policy') {
      return '20rem';
    }
    return '0.66rem';
  }
  return '40rem';
};

export const Input = styled.input(({ page, id }) => ({
  width: selectWidth(page, id),
  padding: '0.5rem',
  fontSize: '1rem',
  outline: 0,
}));

export const InputWrapper = styled.div(({ page }) => ({
  width: '100%',
  height: '3rem',
  display: 'flex',
  // justifyContent: page !== 'info' ? 'space-between' : 'center',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 10rem',
  marginBottom: '1rem',

  '&:nth-last-of-type(1)': {
    marginBottom: 0,
  },
}));

export const SignUpPageContainer = styled.div`
  padding: 0 calc(200 / 1000 * 100%);
`;
