// @flow
import { combineReducers } from 'redux';
import { authReducer as auth } from './auth';
import { sprintsReducer as sprints } from './sprints';
import { projectsReducer as projects } from './projects';
import { boardsReducer as boards } from './boards';
import { AppNavigator } from 'DailyScrum/src/Scenes';
import type { AuthType } from './auth/reducer';
import type { SprintsType } from './sprints/reducer';
import type { ProjectsType } from './projects/reducer';
import type { BoardsType } from './boards/reducer';

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

const appReducer = combineReducers({
  navigation: navReducer,
  auth,
  sprints,
  projects,
  boards,
});

const initialState = {};

const rootReducer = (state: any = initialState, action: any = {}) => appReducer(state, action);

export type StateType = {
  auth: AuthType,
  sprints: SprintsType,
  projects: ProjectsType,
  boards: BoardsType,
};

export default rootReducer;
