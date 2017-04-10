// @flow
import type { ScrumbleSprintType } from 'DailyScrum/src/types/Scrumble';

export type ActionType =
  | {
      type: 'PUT_SPRINTS',
      payload: {
        sprints: ScrumbleSprintType[],
        doAdapt: boolean,
      },
    }
  | {
      type: 'SET_CURRENT_SPRINT',
      payload: ScrumbleSprintType,
    }
  | {
      type: 'FETCH_CURRENT_SPRINT',
    }
  | {
      type: 'FETCH_SPRINTS',
    };

export function putSprints(sprints: ScrumbleSprintType[], doAdapt: boolean = false): ActionType {
  return {
    type: 'PUT_SPRINTS',
    payload: { sprints, doAdapt },
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
