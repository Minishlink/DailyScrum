// @flow
import type { ScrumbleProjectType } from 'DailyScrum/src/types/Scrumble/Project';

export type ActionType =
  | {
      type: 'PUT_PROJECTS',
      payload: {
        projects: ScrumbleProjectType[],
      },
    }
  | {
      type: 'SET_CURRENT_PROJECT',
      payload: { project: ScrumbleProjectType },
    }
  | {
      type: 'FETCH_CURRENT_PROJECT',
    };

export function putProjects(projects: ScrumbleProjectType[]): ActionType {
  return {
    type: 'PUT_PROJECTS',
    payload: { projects },
  };
}

export function setCurrentProject(project: ScrumbleProjectType): ActionType {
  return {
    type: 'SET_CURRENT_PROJECT',
    payload: { project },
  };
}

export function fetchCurrentProject(): ActionType {
  return { type: 'FETCH_CURRENT_PROJECT' };
}
