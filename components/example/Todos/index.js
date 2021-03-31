import { useCallback } from 'react';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import TodoItem from '../TodoItem';
import { changeInput, insert, toggle, remove } from '~/actions/example/todos';
import useActions from '~/lib/useActions';

// const Todos = ({
//   input,
//   todos,
//   onChangeInput,
//   onInsert,
//   onToggle,
//   onRemove,
// }) => {
//   const onSubmit = e => {
//     e.preventDefault();
//     onInsert(input);
//     onChangeInput('');
//   };
//   const onChange = e => onChangeInput(e.target.value);
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input type="text" onChange={onChange} />
//         <button type="submit">등록</button>
//       </form>
//       <div>
//         {todos.map(todo => (
//           <TodoItem
//             todo={todo}
//             key={todo.id}
//             onToggle={onToggle}
//             onRemove={onRemove}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

const selectInput = createSelector(
  state => state.todos.input,
  input => input,
);
const selectAllTodos = createSelector(
  state => state.todos.todos,
  todos => todos,
);

const Todos = () => {
  const input = useSelector(selectInput);
  const todos = useSelector(selectAllTodos);

  const [onChangeInput, onInsert, onToggle, onRemove] = useActions([
    changeInput,
    insert,
    toggle,
    remove,
  ]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      onInsert(input);
      onChangeInput('');
    },
    [input, onInsert, onChangeInput],
  );

  const onChange = useCallback(e => onChangeInput(e.target.value), [
    onChangeInput,
  ]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <div>
        {todos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            toggle={onToggle}
            remove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;
