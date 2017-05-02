// @flow
import type { StateType } from '../reducers';

const initialSyncState = {
  isLoading: false,
  error: null,
};

const AndLogicReducer = (all, current) => all && current;
const OrLogicReducer = (all, current) => all || current;
const FlattenArrayReducer = (all, current) => {
  const toAdd = Array.isArray(current) ? current.reduce(FlattenArrayReducer, []) : current;
  return all.concat(all.includes(Array.isArray(toAdd) ? toAdd[0] : toAdd) ? undefined : toAdd);
};

const mapReducer = (
  state: StateType,
  reducer: Function,
  reducerInitialValue: any,
  condition: Function,
  name: ?string,
  key: ?string
) => {
  if (!name) {
    return Object.keys(state.sync)
      .map(name => mapReducer(state, reducer, reducerInitialValue, condition, name))
      .reduce(reducer, reducerInitialValue);
  }

  const syncName = state.sync[name];
  if (!syncName) {
    return condition(initialSyncState);
  }

  if (!key) {
    return Object.keys(syncName)
      .map(key => mapReducer(state, reducer, reducerInitialValue, condition, name, key))
      .reduce(reducer, reducerInitialValue);
  }

  const syncNameKey = state.sync[name][key];
  if (!syncNameKey) {
    return condition(initialSyncState);
  }

  return condition(syncNameKey);
};

export const isSyncSuccessfulSelector = (state: StateType, name: ?string, key: ?string) => {
  return mapReducer(state, AndLogicReducer, true, syncState => !syncState.error, name, key);
};

export const isSyncingSelector = (state: StateType, name: ?string, key: ?string) => {
  return mapReducer(state, OrLogicReducer, false, syncState => syncState.isLoading, name, key);
};

export const errorsSelector = (state: StateType, name: ?string, key: ?string) => {
  return mapReducer(state, FlattenArrayReducer, [], syncState => [syncState.error], name, key).filter(Boolean);
};
