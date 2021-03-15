import React from 'react';
import EmoEx from '../components/EmoEx';
// import CounterContainer from '../container/CounterContainer';
import Counter from '../components/Counter';
// import TodosContainer from '../container/TodosContainer';
import Todos from '../components/Todos';

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
