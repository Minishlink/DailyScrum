// @flow
import { isArray } from 'lodash';
import { Platform } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

const setTopLevelNavigator = (navigatorRef: any) => {
  _navigator = navigatorRef;
};

const dispatch = (...args: any) => _navigator.dispatch(...args);

const redirectAfterLogin = (isFirstTime?: boolean) => {
  const action = isFirstTime
    ? StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'main',
            action: StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({ routeName: 'tabs' }),
                NavigationActions.navigate({ routeName: 'projectSettings', params: { firstTime: true } }),
              ],
            }),
          }),
        ],
      })
    : StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'main' })],
      });
  dispatch(action);
};

const resetToLogin = () =>
  dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'login' })],
    })
  );

const routeFromNavigationStateSelector = (state: any) => {
  if (!state) return null;
  const currentRootRoute = state.routes[state.index];
  if (isArray(currentRootRoute.routes)) {
    return routeFromNavigationStateSelector(currentRootRoute);
  }
  return currentRootRoute;
};

export default {
  setTopLevelNavigator,
  routeFromNavigationStateSelector,
  dispatch,
  resetToLogin,
  redirectAfterLogin,
};

export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
export const HEADER_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;
