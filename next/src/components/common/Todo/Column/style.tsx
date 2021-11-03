import styled from '@emotion/styled';
import { scrollStyles as listScrollStyles } from '../ColumnList/style';
import { fixedScrollWidth as containerScrollWidth } from '../Container/style';

const COLUMN_COUNT = 3;
export const Column = styled.li`
  display: inline-block;
  width: calc(${containerScrollWidth} / ${COLUMN_COUNT});
  height: 100%;
  overflow-y: scroll;

  ${listScrollStyles}
`;
