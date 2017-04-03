// @flow
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from './reducers';
import rootSaga from './sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares), autoRehydrate()];
  return { ...createStore(reducers, composeEnhancers(...enhancers)), runSaga: sagaMiddleware.run };
};

export default function () {
  return new Promise(resolve => {
    const store = configureStore();
    store.runSaga(rootSaga);
    return persistStore(
      store,
      {
        storage: AsyncStorage,
        blacklist: ['navigation'],
      },
      () => resolve(store)
    );
  });
}
