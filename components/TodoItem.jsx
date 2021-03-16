import { useCallback } from 'react';

const TodoItem = ({ todo, toggle, remove }) => {
  const onToggle = useCallback(() => {
    toggle(todo.id);
  }, [todo.id, toggle]);

  const onRemove = useCallback(() => {
    remove(todo.id);
  }, [todo.id, remove]);

  return (
    <div>
      <input type="checkbox" onClick={onToggle} checked={todo.done} readOnly />
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button type="button" onClick={onRemove}>
        {' '}
        삭제
      </button>
    </div>
  );
};

export default TodoItem;
