// @flow
import type { ActionType } from '../actions';
import type { StateType } from '../reducers';

const initialState: QualityIndicatorsStateType = {
  bugs: null,
};

export default (state: QualityIndicatorsStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'SET_BUGS_COUNT':
      return {
        ...state,
        bugs: action.payload.count,
      };

    case 'RESET_STORE':
      return initialState;

    default:
      return state;
  }
};

const qualityIndicatorsStateSelector = (state: StateType) => state.qualityIndicators;

export const bugsCountSelector = (state: StateType) => qualityIndicatorsStateSelector(state).bugs;
export const validationFeedbacksCountSelector = (state: StateType) => 0;

export type QualityIndicatorsStateType = {|
  bugs: ?number,
|};
