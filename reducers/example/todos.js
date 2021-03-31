import { handleActions } from 'redux-actions';
import * as todos from '../../actions/example/todos';

// 리듀서
const todosReducer = handleActions(
  {
    [todos.CHANGE_INPUT]: (state, action) => ({
      ...state,
      input: action.payload,
    }),
    [todos.INSERT]: (state, action) => ({
      ...state,
      todos: state.todos.concat(action.payload),
    }),
    [todos.TOGGLE]: (state, action) => ({
      ...state,
      todos: state.todos.map(todo =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
      ),
    }),
    [todos.REMOVE]: (state, action) => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== action.payload),
    }),
  },
  todos.initialState,
);

export default todosReducer;
