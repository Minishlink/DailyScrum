// @flow
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import reducers from './reducers';
import rootSaga from './sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const reactNavigationMiddleware = createReactNavigationReduxMiddleware('root', state => state.navigation);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [sagaMiddleware, reactNavigationMiddleware];
  const enhancers = [applyMiddleware(...middlewares), autoRehydrate()];
  return { ...createStore(reducers, composeEnhancers(...enhancers)), runSaga: sagaMiddleware.run };
};

export default (): Promise<any> =>
  new Promise(resolve => {
    const store = configureStore();
    const reactNavigationAddListener = createReduxBoundAddListener('root');
    store.runSaga(rootSaga);
    return persistStore(
      store,
      {
        storage: AsyncStorage,
        //whitelist: ['auth'], // handy when debugging
        blacklist: ['navigation', 'sync'],
      },
      () => resolve({ store, reactNavigationAddListener })
    );
  });
