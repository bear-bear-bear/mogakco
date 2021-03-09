import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../actions/counter';
import makeGetCounter from '../selectors/counter';

const makeMapStateToProps = () => {
  const getCounter = makeGetCounter();
  const mapStateToProps = state => {
    return {
      num: getCounter(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => {
  return {
    increase: () => {
      dispatch(increase());
    },
    decrease: () => {
      dispatch(decrease());
    },
  };
};

const CounterContainer = ({ num, increase, decrease }) => {
  return <Counter num={num} onIncrease={increase} onDecrease={decrease} />;
};

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(CounterContainer);
