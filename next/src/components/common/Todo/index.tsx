import useUser from '@hooks/useUser';
import { IUserGetSuccessResponse } from 'typings/auth';

import Container from './Container';
import Header from './Header';
import ColumnList from './ColumnList';
import Column from './Column';

// const SortContext =

const Todo = () => {
  const { user } = useUser();

  if (!user?.isLoggedIn) return null;
  const { todo: todoItems } = user as IUserGetSuccessResponse;

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
