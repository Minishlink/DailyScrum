// @flow
import React, { PureComponent } from 'react';
import qs from 'qs';
import { isEmpty } from 'lodash';
import AppNavigator from './AppNavigator';
import Navigation from '../services/Navigation';

const publicPath = process.env.PUBLIC_PATH || '/';
const publicPathRegex = new RegExp(`^${publicPath}`);

const getPathAndParamsFromLocation = location => {
  const path = location.pathname.replace(publicPathRegex, '');
  const params = qs.parse(location.search);
  return { path, params };
};

const getLocationFromPathAndParams = ({ path, params }) => {
  const suffix = !isEmpty(params) ? `?${qs.stringify(params)}` : '';
  return publicPath + path + suffix;
};

class Routing extends PureComponent<Props> {
  dispatch = Navigation.dispatch;

  componentDidMount() {
    window.onpopstate = e => {
      e.preventDefault();

      const pathAndParams = getPathAndParamsFromLocation(window.location);
      const action = AppNavigator.router.getActionForPathAndParams(pathAndParams.path, pathAndParams.params);
      if (action) {
        this.dispatch(action);
      }
    };
  }

  onNavigationStateChange = (prevState: any, currentState: any, action: Object) => {
    this.props.onNavigationStateChange(prevState, currentState, action);

    const pathAndParams = AppNavigator.router.getPathAndParamsForState(currentState);
    const currentLocation = getLocationFromPathAndParams(getPathAndParamsFromLocation(window.location));
    const location = getLocationFromPathAndParams(pathAndParams);

    if (currentLocation !== location) {
      window.history.pushState(null, null, location);
    }
  };

  render() {
    return (
      <AppNavigator
        uriPrefix={this.props.uriPrefix}
        ref={this.props.setNavigatorRef}
        onNavigationStateChange={this.onNavigationStateChange}
      />
    );
  }
}

type Props = {
  uriPrefix: string,
  setNavigatorRef: Function,
  onNavigationStateChange: Function,
};

export default Routing;
