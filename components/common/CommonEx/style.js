import styled from '@emotion/styled';

export const Label = styled.label`
  color: royalblue;
  font-size: 1rem;
  font-weight: bold;
`;

export const TextArea = styled.textarea(props => ({
  width: '200px',
  height: '200px',
  color: props.color,
}));
