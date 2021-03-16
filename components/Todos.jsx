import { useCallback } from 'react';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem';
import { changeInput, insert, toggle, remove } from '../actions/todos';

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
  const dispatch = useDispatch();
  const input = useSelector(selectInput);
  const todos = useSelector(selectAllTodos);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(insert(input));
      dispatch(changeInput(''));
    },
    [dispatch, input],
  );
  const onChange = useCallback(e => dispatch(changeInput(e.target.value)), [
    dispatch,
  ]);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <div>
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} toggle={toggle} remove={remove} />
        ))}
      </div>
    </div>
  );
};

export default Todos;
