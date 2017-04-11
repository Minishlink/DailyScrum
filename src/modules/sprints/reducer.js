// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import type { SprintType, TeamType } from 'DailyScrum/src/types';
import { adaptSprintFromScrumble } from 'DailyScrum/src/services/adapter';
import { roundToDecimalPlace } from 'DailyScrum/src/services/MathService';
import { userSelectorById } from '../users/reducer';

const initialState: SprintsStateType = {
  currentSprint: null,
  list: {},
};

export default (state: SprintsStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'SET_CURRENT_SPRINT':
      return {
        ...state,
        currentSprint: action.payload.id,
      };

    case 'PUT_SPRINTS':
      const { list } = { ...state };
      for (let sprint of action.payload.sprints) {
        if (action.payload.doAdapt) {
          sprint = adaptSprintFromScrumble(sprint);
        }
        list[sprint.id] = addAdditionalData(sprint);
      }

      return {
        ...state,
        list,
      };

    default:
      return state;
  }
};

const addAdditionalData = (sprint: SprintType): SprintType => {
  // find the dates that have a positive standard and a positive done
  const performances = sprint.performance.filter(data => {
    return !!data.done && !!data.standard;
  });

  sprint.pointsLeft = sprint.resources.totalPoints;
  if (performances.length) {
    const todayPerformance = performances[performances.length - 1];
    sprint.pointsLeft -= todayPerformance.done;

    const points = todayPerformance.done - todayPerformance.standard;
    sprint.lead = {
      points: roundToDecimalPlace(points),
      manDays: roundToDecimalPlace(sprint.resources.totalManDays / sprint.resources.totalPoints * points),
    };
  }

  return sprint;
};


export function sprintsSelector(state: StateType): SprintsType {
  return state.sprints.list;
}

export function currentSprintSelector(state: StateType): ?SprintType {
  const sprints = sprintsSelector(state);
  if (state.sprints.currentSprint) {
    return sprints[state.sprints.currentSprint];
  }

  return null;
}

export function teamSelector(state: StateType): ?TeamType {
  const currentSprint = currentSprintSelector(state);
  if (currentSprint) {
    return currentSprint.resources.team.map(id => userSelectorById(state, id)).filter(Boolean);
  }

  return null;
}

export type SprintsStateType = {
  currentSprint: ?number,
  list: SprintsType,
};

export type SprintsType = {
  [key: number]: SprintType,
};
