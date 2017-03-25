// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import type { ScrumbleProjectType } from '../../types/Scrumble/Project';

const initialState: ProjectsType = {};

export default (state: ProjectsType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'SET_CURRENT_PROJECT':
      return {
        ...state,
        currentProject: action.payload.id,
      };

    case 'PUT_PROJECT':
      return {
        ...state,
        [action.payload.id]: action.payload,
      };

    default:
      return state;
  }
};

export function projectsSelector(state: StateType): ProjectsType {
  return state.projects;
}

export function currentProjectSelector(state: StateType): ?ProjectType {
  if (state.projects.currentProject) {
    return state.projects[state.projects.currentProject];
  }

  return null;
}

export type ProjectsType = { [key: number]: ProjectType, currentProject?: number };

export type ProjectType = ScrumbleProjectType;
