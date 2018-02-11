// @flow
import { merge } from 'lodash';
import type { ActionType } from '../actions';

const initialState: SyncStateType = {};

const assignState = (state: SyncStateType, name: ?string, key: ?string, sync: SyncType): SyncStateType => {
  if (!name) {
    Object.keys(state).forEach(name => assignState(state, name, null, sync));
    return state;
  }

  if (!key) {
    Object.keys(state[name]).forEach(key => assignState(state, name, key, sync));
    return state;
  }

  return merge(state, { [name]: { [key]: sync } });
};

export default (state: SyncStateType = initialState, action: ActionType) => {
  if (action.type === 'RESET_STORE') return initialState;

  if (!action.payload || !action.payload.name || !action.payload.key) return state; // payload is mandatory for these actions
  const { name, key } = action.payload;

  switch (action.type) {
    case 'START_SYNC':
      return {
        ...assignState(state, name, key, {
          isLoading: true,
          error: null,
        }),
      };

    case 'END_SYNC':
      return {
        ...assignState(state, name, key, {
          isLoading: false, // $FlowFixMe ???
          error: action.payload.error,
        }),
      };

    case 'CLEAR_ERRORS':
      return {
        ...assignState(state, name, key, {
          error: null,
        }),
      };

    default:
      return state;
  }
};

export type SyncStateType = {
  [string]: { [string]: SyncType },
};

type SyncType = {
  isLoading?: boolean,
  error?: ?(string | true),
};
