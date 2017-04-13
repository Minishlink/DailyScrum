// @flow
import type { ScrumbleProjectType } from 'DailyScrum/src/types/Scrumble/Project';
import type { BoardType } from '../../types';

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
    }
  | {
      type: 'CHANGE_CURRENT_REMOTE_PROJECT',
      payload: {
        boardId: string,
      },
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

export function changeCurrentRemoteProject(board: BoardType): ActionType {
  return { type: 'CHANGE_CURRENT_REMOTE_PROJECT', payload: { boardId: board.id } };
}
