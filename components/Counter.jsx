// const Counter = ({ num, onIncrease, onDecrease }) => {
//   return (
//     <div>
//       <h1>{num}</h1>
//       <button type="button" onClick={onIncrease}>
//         +1
//       </button>
//       <button type="button" onClick={onDecrease}>
//         -1
//       </button>
//     </div>
//   );
// };

import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { increase, decrease } from '../actions/counter';

const selectNum = createSelector(
  state => state.counter.num,
  num => num,
);

const Counter = () => {
  const dispatch = useDispatch();
  const num = useSelector(selectNum);

  return (
    <div>
      <h1>{num}</h1>
      <button
        type="button"
        onClick={() => {
          dispatch(increase());
        }}
      >
        +1
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(decrease());
        }}
      >
        -1
      </button>
    </div>
  );
};

export default Counter;
