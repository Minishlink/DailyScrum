// @flow
import React, { PureComponent } from 'react';
import Routing from './Routing';
import Navigation, { URIPrefix } from '../services/Navigation';
import { Analytics } from '../services';

class Scenes extends PureComponent<{}> {
  setNavigatorRef = (navigatorRef: any) => {
    Navigation.setTopLevelNavigator(navigatorRef);
  };

  onNavigationStateChange = (prevState: any, currentState: any) => {
    const currentRoute = Navigation.routeFromNavigationStateSelector(currentState);
    const currentRouteName = currentRoute && currentRoute.routeName;
    const prevRoute = Navigation.routeFromNavigationStateSelector(prevState);
    const prevRouteName = prevRoute && prevRoute.routeName;

    if (prevRouteName !== currentRouteName) {
      Analytics.setCurrentScreen(currentRouteName);
    }
  };

  render() {
    return (
      <Routing
        uriPrefix={URIPrefix}
        setNavigatorRef={this.setNavigatorRef}
        onNavigationStateChange={this.onNavigationStateChange}
      />
    );
  }
}

export default Scenes;
