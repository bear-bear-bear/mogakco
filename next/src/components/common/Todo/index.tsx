import Container from './Container';
import Header from './Header';
import ColumnList from './ColumnList';
import Column from './Column';

const Todo = () => {
  return (
    <Container>
      <Header />
      <ColumnList>
        <Column />
        <Column />
        <Column />
      </ColumnList>
    </Container>
  );
};

export default Todo;
