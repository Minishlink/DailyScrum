// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import type { SprintType, TeamType } from 'DailyScrum/src/types';
import { adaptSprintFromScrumble } from 'DailyScrum/src/services/adapter';
import { roundToDecimalPlace } from 'DailyScrum/src/services/MathService';
import { userSelectorById } from '../users/reducer';
import { currentProjectSelector } from '../projects/reducer';
import { PerformanceType } from '../../types';

const initialState: SprintsStateType = {
  currentSprint: null,
  list: {},
};

export default (state: SprintsStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'SET_CURRENT_SPRINT':
      return {
        ...state,
        currentSprint: action.payload.sprintId,
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

    case 'CLEAR_SPRINTS':
      return {
        currentSprint: null,
        list: {},
      };

    case 'RESET_STORE':
      return initialState;

    default:
      return state;
  }
};

const addAdditionalData = (sprint: SprintType): SprintType => {
  // find the dates that have a positive standard and a positive done
  const performances = sprint.performance.filter(data => !!data.done && !!data.standard);

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
  sprint.pointsLeft = roundToDecimalPlace(sprint.pointsLeft);

  return sprint;
};

export function sprintsSelector(state: StateType): SprintsType {
  return state.sprints.list;
}

export function sprintsListSelector(state: StateType): SprintType[] {
  return Object.values(state.sprints.list);
}

export function sprintsListForCurrentProjectSelector(state: StateType): SprintType[] {
  const currentProject = currentProjectSelector(state);
  if (!currentProject) return [];
  const sprintsList = sprintsListSelector(state);
  return sprintsList.filter(sprint => sprint.projectId === currentProject.id);
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

export function devTeamSelector(state: StateType): ?TeamType {
  const team = teamSelector(state);
  if (team) {
    return team.filter(member => member.role === 'dev' || member.role === 'archi');
  }

  return null;
}

export function sprintsSuccessMatrixSelector(state: StateType): SprintsSuccessMatrixType {
  const sprints = sprintsListSelector(state);
  const project = currentProjectSelector(state);
  if (!project) return [];

  return sprints
    .filter(sprint => sprint.projectId === project.id)
    .sort((a: SprintType, b: SprintType) => a.number - b.number)
    .map(sprint => {
      const lastPerformance = sprint.performance[sprint.performance.length - 1];
      const isSprintFinished = lastPerformance && new Date().getTime() >= new Date(lastPerformance.date).getTime();
      return {
        number: sprint.number,
        manDays: sprint.resources.totalManDays,
        foreseenPoints: roundToDecimalPlace(sprint.resources.totalPoints),
        donePoints: roundToDecimalPlace(sprint.resources.totalPoints - sprint.pointsLeft),
        result: sprint.pointsLeft <= 0 ? true : isSprintFinished ? false : null, // return true even if the sprint is not finished in case of success
      };
    });
}

export function bdcDataPointsSelector(state: StateType): ?BdcDataPointsType {
  const currentSprint = currentSprintSelector(state);
  if (!currentSprint) return null;

  let doneDataPoints = [];
  let standardDataPoints = [];

  const totalPoints = currentSprint.resources.totalPoints;

  Object.values(currentSprint.performance).forEach((performance: PerformanceType, index: number) => {
    const date = new Date(performance.date).getTime();
    standardDataPoints.push({ x: index, y: roundToDecimalPlace(totalPoints - performance.standard), date });

    if (performance.done || (!performance.done && !performance.standard)) {
      doneDataPoints.push({ x: index, y: roundToDecimalPlace(totalPoints - performance.done), date });
    }
  });

  return [doneDataPoints, standardDataPoints].filter(array => array.length > 0);
}

export function isCurrentSprintActiveSelector(state: StateType): boolean {
  const currentSprint = currentSprintSelector(state);
  return !!currentSprint && currentSprint.isActive;
}

type DataPointsType = Array<{ x: number, y: number }>;

export type BdcDataPointsType = Array<DataPointsType>;

export type SprintsSuccessMatrixType = Array<{|
  number: number,
  manDays: number,
  foreseenPoints: number,
  donePoints: ?number,
  result: ?boolean,
|}>;

export type SprintsStateType = {|
  currentSprint: ?number,
  list: SprintsType,
|};

export type SprintsType = {
  [key: number]: SprintType,
};
