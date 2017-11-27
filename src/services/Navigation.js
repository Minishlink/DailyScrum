// @flow
import { Platform } from 'react-native';

export const getRouteNamesFromState = (state: any, routeNames: string[] = [], initial: boolean = true) => {
  const route = state.routes[state.index];
  if (initial && state.routeName) routeNames.push(state.routeName);
  routeNames.push(route.routeName);
  if (route.routes) return getRouteNamesFromState(route, routeNames, false);
  return routeNames;
};

export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
export const HEADER_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;
