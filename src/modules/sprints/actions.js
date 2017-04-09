// @flow
import type { ScrumbleSprintType } from 'DailyScrum/src/types/Scrumble/Sprint';

export type ActionType = {
  type: 'PUT_SPRINTS',
  payload: ScrumbleSprintType[],
} | {
  type: 'SET_CURRENT_SPRINT',
  payload: ScrumbleSprintType,
} | {
  type: 'FETCH_CURRENT_SPRINT',
} | {
  type: 'FETCH_SPRINTS',
};

export function putSprints(sprints: ScrumbleSprintType[]): ActionType {
  return {
    type: 'PUT_SPRINTS',
    payload: sprints,
  };
}

export function setCurrentSprint(payload: ScrumbleSprintType): ActionType {
  return {
    type: 'SET_CURRENT_SPRINT',
    payload,
  };
}

export function fetchCurrentSprint(): ActionType {
  return { type: 'FETCH_CURRENT_SPRINT' };
}

export function fetchSprints(): ActionType {
  return { type: 'FETCH_SPRINTS' };
}
