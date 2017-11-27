// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import type { ProjectType } from '../../types';
import { adaptProjectFromScrumble } from 'DailyScrum/src/services/adapter';

const initialState: ProjectsStateType = {
  currentProject: null,
  list: {},
};

export default (state: ProjectsStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'SET_CURRENT_PROJECT':
      return {
        ...state,
        currentProject: action.payload.project.id,
      };

    case 'PUT_PROJECTS':
      const { list } = { ...state };
      for (let project of action.payload.projects) {
        if (action.payload.doAdapt) {
          project = adaptProjectFromScrumble(project);
        }
        list[project.id] = project;
      }

      return {
        ...state,
        list,
      };

    case 'RESET_STORE':
      return initialState;

    default:
      return state;
  }
};

export function projectsSelector(state: StateType): ProjectsType {
  return state.projects.list;
}

export function currentProjectSelector(state: StateType): ?ProjectType {
  if (state.projects.currentProject) {
    return state.projects.list[state.projects.currentProject];
  }

  return null;
}

export const currentProjectNameSelector = (state: StateType): ?string => {
  const project = currentProjectSelector(state);
  return project ? project.name : null;
};

export const validateColumnIdSelector = (state: StateType): ?string => {
  const project = currentProjectSelector(state);
  if (!project) return null;
  return project.columnMapping.toValidate;
};

export type ProjectsStateType = {|
  currentProject: ?number,
  list: ProjectsType,
|};

export type ProjectsType = {
  [key: number]: ProjectType,
};
