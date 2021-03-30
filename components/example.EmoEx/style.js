import styled from '@emotion/styled';

export const Button = styled.button`
  color: ${props => (props.primary ? 'hotpink' : 'turquoise')};
  background-color: #fff;
`;

export const Container = styled.div(props => ({
  display: 'flex',
  flexDirection: props.column && 'column',
}));
