import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import rootSaga from '../sagas';

const isDev = process.env.NODE_ENV === 'development';
const sagaMiddleware = createSagaMiddleware();

const getStore = () => {
  const config = configureStore({
    reducer,
    middleware: [sagaMiddleware],
    devTools: isDev,
  });
  sagaMiddleware.run(rootSaga);
  return config;
};

const store = getStore();
const wrapper = createWrapper(() => store, { debug: isDev });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default wrapper;
