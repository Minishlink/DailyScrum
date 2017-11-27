import { isArray, isEqual } from 'lodash';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../../Scenes';
import { Analytics } from '../../services';
import { getRouteNamesFromState } from '../../services/Navigation';

export default (state, action) => {
  const { type } = action;
  if (type === NavigationActions.NAVIGATE && isRouteSameAsLastRouteFromNavigationStateSelector(state, action)) {
    console.warn(
      'You pressed the navigation button two times, pushing two times to the same route.\n\n' +
        'The last dispatch was canceled. \n\n' +
        'If the call was intended, you can add an exception in redux routing.',
      action
    );
    return state || {};
  }

  let newState = null;
  if (type === 'REDIRECT_AFTER_LOGIN') {
    const initialState = AppNavigator.router.getStateForAction({ type: '@@INIT' });
    const resetToMainAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'main' })],
    });
    newState = AppNavigator.router.getStateForAction(resetToMainAction, initialState);

    if (action.payload.isFirstTime) {
      const navigateToProjectSettingsAction = NavigationActions.navigate({
        routeName: 'projectSettings',
        params: { firstTime: true },
      });
      newState = AppNavigator.router.getStateForAction(navigateToProjectSettingsAction, newState);
    }
  } else {
    newState = AppNavigator.router.getStateForAction(action, state);
  }

  if (
    [NavigationActions.INIT, NavigationActions.NAVIGATE, NavigationActions.BACK, NavigationActions.RESET].includes(type)
  ) {
    const route = routeFromNavigationStateSelector(newState);
    Analytics.setCurrentScreen(route.routeName);
  }

  return newState || state;
};

const isRouteSameAsLastRouteFromNavigationStateSelector = (state, action) => {
  const lastRoute = routeFromNavigationStateSelector(state);

  if (!lastRoute) {
    return false;
  }

  // FUTURE add exceptions here (params in lastRoute.params, action.params)
  if (lastRoute.routeName !== action.routeName) {
    return false;
  }

  return isEqual(lastRoute.params, action.params);
};

export const routeFromNavigationStateSelector = (state: any) => {
  const currentRootRoute = state.routes[state.index];
  if (isArray(currentRootRoute.routes)) {
    return routeFromNavigationStateSelector(currentRootRoute);
  }
  return currentRootRoute;
};

export const currentRouteSelector = state => routeFromNavigationStateSelector(state.navigation);

export const isDrawerOpenSelector = state => getRouteNamesFromState(state.navigation).includes('DrawerOpen');
