import { isArray } from 'lodash';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../../Scenes';
import { Analytics } from '../../services';
import { getRouteNamesFromState } from '../../services/Navigation';

export default (state, action) => {
  const { type } = action;

  const newState = AppNavigator.router.getStateForAction(action, state);

  if (
    [NavigationActions.INIT, NavigationActions.NAVIGATE, NavigationActions.BACK, NavigationActions.RESET].includes(type)
  ) {
    const route = routeFromNavigationStateSelector(newState);
    Analytics.setCurrentScreen(route.routeName);
  }

  return newState || state;
};

export const routeFromNavigationStateSelector = (state: any) => {
  const currentRootRoute = state.routes[state.index];
  if (isArray(currentRootRoute.routes)) {
    return routeFromNavigationStateSelector(currentRootRoute);
  }
  return currentRootRoute;
};

export const isDrawerOpenSelector = state => getRouteNamesFromState(state.navigation).includes('DrawerOpen');
