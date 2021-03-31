import { connect } from 'react-redux';
import { changeInput, insert, toggle, remove } from '~/actions/todos';
import Todos from '../components/Todos';
import { makeGetInputText, makeGetTodos } from '~/selectors/todos';

const TodosContainer = ({
  input,
  todos,
  changeInput,
  insert,
  toggle,
  remove,
}) => {
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={changeInput}
      onInsert={insert}
      onToggle={toggle}
      onRemove={remove}
    />
  );
};

const makeMapStateToProps = () => {
  const getTodos = makeGetTodos();
  const getInputText = makeGetInputText();
  const mapStateToProps = (state, props) => ({
    input: getInputText(state),
    todos: getTodos(state, props),
  });
  return mapStateToProps;
};

export default connect(makeMapStateToProps, {
  changeInput,
  insert,
  toggle,
  remove,
})(TodosContainer);
