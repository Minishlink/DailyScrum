// @flow
import type { StateType } from '../reducers';

const initialSyncState = {
  isLoading: false,
  error: null,
};

const AndLogicReducer = (all, current) => all && current;
const mapReducer = (state: StateType, reducer: Function, name: ?string, key: ?string) => {
  if (!name) {
    return Object.keys(state.sync).map(name => mapReducer(state, reducer, name)).reduce(AndLogicReducer, true);
  }

  if (!key) {
    return Object.keys(state.sync[name])
      .map(key => mapReducer(state, reducer, name, key))
      .reduce(AndLogicReducer, true);
  }

  if (!state.sync[name] || !state.sync[name][key]) {
    return reducer(initialSyncState);
  }

  return reducer(state.sync[name][key]);
};

export const isSyncSuccessfulSelector = (state: StateType, name: ?string, key: ?string) => {
  return mapReducer(state, syncState => !syncState.isLoading && !syncState.error, name, key);
};

export const isSyncingSelector = (state: StateType, name: ?string, key: ?string) => {
  return mapReducer(state, syncState => syncState.isLoading, name, key);
};
