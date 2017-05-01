// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';

const initialState: CommonStateType = {
  lastSuccessfulSyncDate: null,
};

export default (state: CommonStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'SUCCESSFUL_SYNC':
      return {
        ...state,
        lastSuccessfulSyncDate: Date.now(),
      };

    default:
      return state;
  }
};

export function lastSuccessfulSyncDateSelector(state: StateType): ?Date {
  const date = state.common.lastSuccessfulSyncDate;
  if (date) {
    return new Date(date);
  }
  return null;
}

export type CommonStateType = {|
  lastSuccessfulSyncDate: ?number,
|};
