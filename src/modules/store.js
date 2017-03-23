// @flow
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (callback: Function) => {
  const middlewares = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares), autoRehydrate()];

  const store = createStore(reducers, composeEnhancers(...enhancers));
  sagaMiddleware.run(rootSaga);

  return persistStore(
    store,
    {
      storage: AsyncStorage,
      whitelist: ['auth'],
    },
    () => callback(store)
  );
};
