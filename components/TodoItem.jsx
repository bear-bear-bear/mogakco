import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const TodoItem = ({ todo, toggle, remove }) => {
  const dispatch = useDispatch();
  const onToggle = useCallback(() => dispatch(toggle(todo.id)), [
    dispatch,
    toggle,
    todo.id,
  ]);
  const onRemove = useCallback(() => dispatch(remove(todo.id)), [
    dispatch,
    remove,
    todo.id,
  ]);
  return (
    <div>
      <input type="checkbox" onClick={onToggle} checked={todo.done} readOnly />
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button type="button" onClick={onRemove}>
        삭제
      </button>
    </div>
  );
};

export default TodoItem;
