// @flow
import { combineReducers } from 'redux';
import { authReducer as auth } from './auth';
import { sprintsReducer as sprints } from './sprints';
import { AppNavigator } from 'DailyScrum/src/Scenes';
import type { AuthType } from './auth/reducer';
import type { SprintsType } from './sprints/reducer';

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

const appReducer = combineReducers({
  navigation: navReducer,
  auth,
  sprints,
});

const initialState = {};

const rootReducer = (state: any = initialState, action: any = {}) => appReducer(state, action);

export type StateType = {
  auth: AuthType,
  sprints: SprintsType,
};

export default rootReducer;
