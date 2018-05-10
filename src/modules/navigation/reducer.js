import { isArray } from 'lodash';
import { NavigationActions, StackActions } from 'react-navigation';
import { AppNavigator } from '../../Scenes';
import { Analytics } from '../../services';
import { getRouteNamesFromState } from '../../services/Navigation';

export default (state, action) => {
  const { type } = action;

  let newState = null;
  if (type === 'REDIRECT_AFTER_LOGIN') {
    const initialState = AppNavigator.router.getStateForAction({ type: '@@INIT' });
    const resetToMainAction = StackActions.reset({
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
  } else if (type === 'RESET_TO_LOGIN') {
    newState = AppNavigator.router.getStateForAction({ type: '@@INIT' });
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

export const routeFromNavigationStateSelector = (state: any) => {
  const currentRootRoute = state.routes[state.index];
  if (isArray(currentRootRoute.routes)) {
    return routeFromNavigationStateSelector(currentRootRoute);
  }
  return currentRootRoute;
};

export const isDrawerOpenSelector = state => getRouteNamesFromState(state.navigation).includes('DrawerOpen');
