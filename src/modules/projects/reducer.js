// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import type { ProjectType } from '../../types';

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
        list[project.id] = project;
      }

      return {
        ...state,
        list,
      };

    default:
      return state;
  }
};

export function projectsSelector(state: StateType): ProjectsType {
  return state.projects.list;
}

export function currentProjectSelector(state: StateType): ?ProjectType {
  if (state.projects.currentProject) {
    return state.projects[state.projects.currentProject];
  }

  return null;
}

export type ProjectsStateType = {|
  currentProject: ?number,
  list: ProjectsType,
|};

export type ProjectsType = {
  [key: number]: ProjectType,
};
