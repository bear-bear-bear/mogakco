import { css } from '@emotion/react';
import generateStyled from '~/lib/generateStyled';

const SelectStyles = css`
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  outline: 0;
`;

const OptionsStyles = css`
  outline: 0;
  padding: 0.5rem;
`;

const WarningTextStyles = css`
  position: absolute;
  top: 65px;
  color: #f13f31;
`;

// styled-components
export const Select = generateStyled('select', SelectStyles);
export const Option = generateStyled('option', OptionsStyles);
export const WarningText = generateStyled('span', WarningTextStyles);
