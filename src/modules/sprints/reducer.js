// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import type { ScrumbleSprintType } from '../../types/Scrumble/Sprint';

const initialState: SprintsType = {};

export default (state: SprintsType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'SET_CURRENT_SPRINT':
      return {
        ...state,
        currentSprint: action.payload.id,
      };

    case 'PUT_SPRINT':
      return {
        ...state,
        [action.payload.id]: action.payload,
      };

    default:
      return state;
  }
};

export function sprintsSelector(state: StateType): SprintsType {
  return state.sprints;
}

export type SprintsType = { [key: string]: SprintType, currentSprint?: number };

type SprintType = ScrumbleSprintType & {
  lead: number,
};
