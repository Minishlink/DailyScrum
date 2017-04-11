// @flow
import { combineReducers } from 'redux';
import { authReducer as auth } from './auth';
import { usersReducer as users } from './users';
import { sprintsReducer as sprints } from './sprints';
import { projectsReducer as projects } from './projects';
import { boardsReducer as boards } from './boards';
import { cardsReducer as cards } from './cards';
import { AppNavigator } from 'DailyScrum/src/Scenes';
import type { AuthStateType } from './auth/reducer';
import type { UsersStateType } from './users/reducer';
import type { SprintsStateType } from './sprints/reducer';
import type { ProjectsStateType } from './projects/reducer';
import type { BoardsType } from './boards/reducer';
import type { CardsType } from './cards/reducer';

const initialState = {};

const rootReducer = (state: any = initialState, action: any = {}) => {
  const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
  };

  const appReducer = combineReducers({
    navigation: navReducer,
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
  auth: AuthStateType,
  users: UsersStateType,
  sprints: SprintsStateType,
  projects: ProjectsStateType,
  boards: BoardsType,
  cards: CardsType,
|};

export default rootReducer;
