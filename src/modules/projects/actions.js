// @flow
import type { ScrumbleProjectType } from 'DailyScrum/src/types/Scrumble/Project';

export type ActionType =
  | {
      type: 'PUT_PROJECTS',
      payload: {
        projects: ScrumbleProjectType[],
        doAdapt: boolean,
      },
    }
  | {
      type: 'SET_CURRENT_PROJECT',
      payload: { project: ScrumbleProjectType },
    }
  | {
      type: 'FETCH_CURRENT_PROJECT',
    };

export function putProjects(projects: ScrumbleProjectType[], doAdapt: boolean = false): ActionType {
  return {
    type: 'PUT_PROJECTS',
    payload: { projects, doAdapt },
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
