// @flow
import _ from 'lodash';
import type { ActionType } from './';

const initialState: SyncStateType = {};

const assignState = (
  currentState: SyncStateType,
  name: $Keys<SyncStateType>,
  key: string,
  sync: SyncType
): SyncStateType =>
  // yep that's pure laziness
  _.merge({ ...currentState }, { [name]: { [key]: sync } });

export default (state: SyncStateType = initialState, action: ActionType) => {
  if (!action.payload) return state; // payload is mandatory for these actions

  const name = action.payload.name;
  const key = action.payload.key;

  switch (action.type) {
    case 'START_SYNC':
      return assignState(state, name, key, {
        isLoading: true,
        error: null,
      });

    case 'END_SYNC':
      return assignState(state, name, key, {
        isLoading: false, // $FlowFixMe ???
        error: action.payload.error,
      });

    case 'RESET_STORE':
      return initialState;

    default:
      return state;
  }
};

export type SyncStateType = {
  [string]: { [string]: SyncType },
};

type SyncType = {
  isLoading: boolean,
  error: ?(string | true),
};
