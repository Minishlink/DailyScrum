// @flow
import { combineReducers } from 'redux';
import { commonReducer as common } from './common';
import { syncReducer as sync } from './sync';
import { authReducer as auth } from './auth';
import { usersReducer as users } from './users';
import { sprintsReducer as sprints } from './sprints';
import { projectsReducer as projects } from './projects';
import { boardsReducer as boards } from './boards';
import { cardsReducer as cards } from './cards';
import { AppNavigator } from 'DailyScrum/src/Scenes';
import type { CommonStateType } from './common/reducer';
import type { SyncStateType } from './sync/reducer';
import type { AuthStateType } from './auth/reducer';
import type { UsersStateType } from './users/reducer';
import type { SprintsStateType } from './sprints/reducer';
import type { ProjectsStateType } from './projects/reducer';
import type { BoardsStateType } from './boards/reducer';
import type { CardsStateType } from './cards/reducer';

const initialState = {};

const rootReducer = (state: any = initialState, action: any = {}) => {
  const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
  };

  const appReducer = combineReducers({
    navigation: navReducer,
    common,
    sync,
    auth,
    users,
    sprints,
    projects,
    boards,
    cards,
  });

  return appReducer(state, action);
};

export type StateType = {|
  common: CommonStateType,
  sync: SyncStateType,
  auth: AuthStateType,
  users: UsersStateType,
  sprints: SprintsStateType,
  projects: ProjectsStateType,
  boards: BoardsStateType,
  cards: CardsStateType,
|};

export default rootReducer;
