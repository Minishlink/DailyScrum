// @flow
import { combineReducers } from 'redux';
import { authReducer as auth } from './auth';
import { AppNavigator } from 'DailyScrum/src/Scenes';
import type { AuthType } from './auth/reducer';

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

const appReducer = combineReducers({
  navigation: navReducer,
  auth,
});

const initialState = {};

const rootReducer = (state: any = initialState, action: any = {}) => appReducer(state, action);

export type StateType = {
  auth: AuthType,
};

export default rootReducer;
