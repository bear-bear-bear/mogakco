import styled from '@emotion/styled';

const generateStyled = (tag = null, css = null) =>
  styled(`${tag}`)`
    ${css}
  `;

export default generateStyled;
