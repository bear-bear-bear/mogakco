import useUser from '@hooks/useUser';
import type { IUserGetSuccessResponse } from 'typings/auth';

import Container from './Container';
import Header from './Header';
import ColumnList from './ColumnList';
import Column from './Column';
import { TodoProvider } from './TodoContext';

const Todo = () => {
  const { user } = useUser();

  if (!user?.isLoggedIn) return null;
  const { todo } = user as IUserGetSuccessResponse;

  return (
    <TodoProvider value={todo}>
      <Container>
        <Header />
        <ColumnList>
          <Column />
          <Column />
          <Column />
        </ColumnList>
      </Container>
    </TodoProvider>
  );
};

export default Todo;
