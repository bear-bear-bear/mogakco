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

// import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { increase, decrease } from '../actions/counter';
import useActions from '../lib/useActions';

const selectNum = createSelector(
  state => state.counter.num,
  num => num,
);

const Counter = () => {
  const [onIncrease, onDecrease] = useActions([increase, decrease]);

  // const dispatch = useDispatch();
  const num = useSelector(selectNum);
  // const onIncrease = useCallback(() => {
  //   dispatch(increase());
  // }, [dispatch]);
  // const onDecrease = useCallback(() => {
  //   dispatch(decrease());
  // }, [dispatch]);

  return (
    <div>
      <h1>{num}</h1>
      <button type="button" onClick={onIncrease}>
        +1
      </button>
      <button type="button" onClick={onDecrease}>
        -1
      </button>
    </div>
  );
};

export default Counter;
