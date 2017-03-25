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
        [action.payload.id]: scrumbleAdapter(action.payload),
      };

    default:
      return state;
  }
};

function scrumbleAdapter(sprint: ScrumbleSprintType): SprintType {
  // find the most frequent date that is in data.dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const performances = sprint.bdcData.filter(data => {
    return !!data.done && !!data.standard;
  });

  let lead = null;
  if (performances.length) {
    const todayPerformance = performances[performances.length - 1];
    const points = todayPerformance.done - todayPerformance.standard;
    lead = {
      points: Math.round(points * 10) / 10,
      manDays: Math.round(sprint.resources.totalManDays / sprint.resources.totalPoints * points * 10) / 10,
    };
  }

  return {
    ...sprint,
    lead,
  };
}

export function sprintsSelector(state: StateType): SprintsType {
  return state.sprints;
}

export function currentSprintSelector(state: StateType): ?SprintType {
  if (state.sprints.currentSprint) {
    return state.sprints[state.sprints.currentSprint];
  }

  return null;
}

export type SprintsType = { [key: number]: SprintType, currentSprint?: number };

export type SprintType = ScrumbleSprintType & {
  lead?: {
    points: number,
    manDays: number,
  },
};
