import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../actions/example.counter';
import makeGetCounter from '../selectors/example.counter';

const makeMapStateToProps = () => {
  const getCounter = makeGetCounter();
  const mapStateToProps = state => ({
    num: getCounter(state),
  });
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  increase: () => {
    dispatch(increase());
  },
  decrease: () => {
    dispatch(decrease());
  },
});

const CounterContainer = ({ num, increase, decrease }) => {
  return <Counter num={num} onIncrease={increase} onDecrease={decrease} />;
};

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(CounterContainer);
