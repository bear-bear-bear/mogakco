import { useState } from 'react';
import { Todo } from 'typings/auth';

export default function useTodoState(initialState: Todo) {
  const [todo, setTodo] = useState<Todo>();
}
