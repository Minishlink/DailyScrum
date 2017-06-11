export const getRouteNamesFromState = (state, routeNames = [], initial = true) => {
  const route = state.routes[state.index];
  if (initial && state.routeName) routeNames.push(state.routeName);
  routeNames.push(route.routeName);
  if (route.routes) return getRouteNamesFromState(route, routeNames, false);
  return routeNames;
};
