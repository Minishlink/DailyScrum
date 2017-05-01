// @flow
import type { StateType } from '../reducers';

const AndLogicReducer = (all, current) => all && current;
export const isSyncSuccessfulSelector = (state: StateType, name: ?string, key: ?string) => {
  if (!name) {
    return Object.keys(state.sync).map(name => isSyncSuccessfulSelector(state, name)).reduce(AndLogicReducer, true);
  }

  if (!key) {
    return Object.keys(state.sync[name])
    .map(key => isSyncSuccessfulSelector(state, name, key))
    .reduce(AndLogicReducer, true);
  }

  const syncState = state.sync[name][key];
  return !syncState.isLoading && !syncState.error;
};
