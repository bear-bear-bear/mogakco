import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = () => {
  const sagaMilddlware = createSagaMiddleware();
  const middlewares = [sagaMilddlware];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancer);
  sagaMilddlware.run(rootSaga);
  return store;
};

export default createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});
