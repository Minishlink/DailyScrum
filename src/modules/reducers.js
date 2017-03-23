// @flow

import { combineReducers } from 'redux';
import { AppNavigator } from 'DailyScrum/src/Scenes';

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

const appReducer = combineReducers({
  navigation: navReducer,
});

const initialState = {};

const rootReducer = (state: any = initialState, action: any = {}) => appReducer(state, action);

export default rootReducer;
