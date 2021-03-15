import { useDispatch } from 'react-redux';

const TodoItem = ({ todo, onToggle, onRemove }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <input
        type="checkbox"
        onClick={() => dispatch(onToggle(todo.id))}
        checked={todo.done}
        readOnly
      />
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button type="button" onClick={() => dispatch(onRemove(todo.id))}>
        삭제
      </button>
    </div>
  );
};

export default TodoItem;
