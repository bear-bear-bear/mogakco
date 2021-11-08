import { createContext } from 'react';
import type { Todo as TodoType, IUserInfo } from 'typings/auth';

const initialTodo: TodoType = {
  items: [],
  order: {
    status: {
      'next up': [],
      'in progress': [],
      completed: [],
    },
    priority: {
      low: [],
      medium: [],
      high: [],
    },
    all: [],
  },
};
export const TodoContext = createContext<TodoType>(initialTodo);

type ProviderProps = {
  children: React.ReactNode;
  value: IUserInfo['todo'];
};
export const TodoProvider = ({ value, children }: ProviderProps) => (
  <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
);
