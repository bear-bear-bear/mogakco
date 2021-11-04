import * as S from './style';

const ColumnList: React.FC = ({ children }) => {
  return (
    <S.Content>
      <S.ScrollifyWrapper>{children}</S.ScrollifyWrapper>
    </S.Content>
  );
};

export default ColumnList;
