// @flow
import type { ScrumbleProjectType } from 'DailyScrum/src/types/Scrumble/Project';

export type ActionType = {
  type: 'PUT_PROJECT',
  payload: ScrumbleProjectType,
} | {
  type: 'SET_CURRENT_PROJECT',
  payload: ScrumbleProjectType,
} | {
  type: 'FETCH_CURRENT_PROJECT',
};

export function putProject(payload: ScrumbleProjectType): ActionType {
  return {
    type: 'PUT_PROJECT',
    payload,
  };
}

export function setCurrentProject(payload: ScrumbleProjectType): ActionType {
  return {
    type: 'SET_CURRENT_PROJECT',
    payload,
  };
}

export function fetchCurrentProject(): ActionType {
  return { type: 'FETCH_CURRENT_PROJECT' };
}
