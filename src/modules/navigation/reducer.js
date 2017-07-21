import { isArray } from 'lodash';
import { AppNavigator } from 'DailyScrum/src/Scenes';

export default (state, action) => {
  const { type } = action;
  if (type === 'Navigation/NAVIGATE' && isRouteSameAsLastRouteFromNavigationStateSelector(state, action)) {
    console.warn(
      'You pressed the navigation button two times, pushing two times to the same route.\n\n' +
        'The last dispatch was canceled. \n\n' +
        'If the call was intended, you can add an exception in redux routing.',
      action
    );
    return state || {};
  }

  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

const isRouteSameAsLastRouteFromNavigationStateSelector = (state, action) => {
  const lastRoute = routeFromNavigationStateSelector(state);

  if (!lastRoute) {
    return false;
  }

  // FUTURE add exceptions here (params in lastRoute.params, action.params)

  return lastRoute.routeName === action.routeName;
};

export const routeFromNavigationStateSelector = state => {
  const currentRootRoute = state.routes[state.index];
  let route;
  if (isArray(currentRootRoute.routes)) {
    route = currentRootRoute.routes[currentRootRoute.index];
  } else {
    route = currentRootRoute;
  }
  return route;
};
