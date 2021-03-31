import React from 'react';
import EmoEx from '~/components/example.EmoEx';
// import CounterContainer from '../container/example.CounterContainer';
import Counter from '~/components/example.Counter';
// import TodosContainer from '../container/example.TodosContainer';
import Todos from '~/components/example.Todos';

const App = () => {
  return (
    <div>
      <h1>Index page</h1>
      <EmoEx />
      {/* <CounterContainer /> */}
      <Counter />
      <hr />
      <Todos />
      {/* <TodosContainer /> */}
    </div>
  );
};

export default App;
