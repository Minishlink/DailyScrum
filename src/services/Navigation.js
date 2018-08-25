// @flow
import { isArray } from 'lodash';
import { Platform } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

const setTopLevelNavigator = (navigatorRef: any) => {
  _navigator = navigatorRef;
};

const getNavigator = () =>
  new Promise(resolve => {
    if (_navigator) {
      resolve(_navigator);
      return;
    }

    const interval = setInterval(() => {
      if (_navigator) {
        resolve(_navigator);
        clearInterval(interval);
      }
    }, 50);
  });

const dispatch = (...args: any): Promise<void> => getNavigator().then(navigator => navigator.dispatch(...args));

const redirectAfterLogin = (isFirstTime?: boolean) => {
  const action = isFirstTime
    ? NavigationActions.navigate({
        routeName: 'main',
        action: StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'tabs' }),
            NavigationActions.navigate({ routeName: 'projectSettings', params: { firstTime: true } }),
          ],
        }),
      })
    : NavigationActions.navigate({ routeName: 'main' });
  dispatch(action);
};

const resetToLogin = () => dispatch(NavigationActions.navigate({ routeName: 'login' }));

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
export const URIPrefix = Platform.OS !== 'web' ? 'dailyscrum://' : window.location.origin + process.env.PUBLIC_PATH;
