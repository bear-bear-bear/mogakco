import styled from '@emotion/styled';

// TODO: flex로 변경하여 스크롤 남는 문제 해결되는지 확인하기
// http://geon.github.io/programming/2016/02/24/flexbox-full-page-web-app-layout
// https://stackoverflow.com/questions/21515042/scrolling-a-flexbox-with-overflowing-content
export const ColumnList = styled.ul`
  flex: 1;
  white-space: nowrap;
  width: 100%;
  overflow: scroll scroll;

  &::-webkit-scrollbar {
    width: 6px;
    height: 10px;
    background-color: ${({ theme }) => theme.color['gray-0']};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color['gray-4']};
  }
`;
