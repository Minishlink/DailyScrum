// @flow

import React, { Component } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import type { NavigationScreenProp } from 'react-navigation';
import * as Pages from 'DailyScrum/src/pages';

const appNavigatorPages = {
  home: {
    screen: Pages.Home,
    path: 'login#token=:token',
  },
  board: {
    screen: Pages.Board,
  },
};

const appNavigatorConfig = {
  initialRouteName: 'home',
  URIPrefix: 'dailyscrum://',
  headerMode: 'none',
};

export const AppNavigator = StackNavigator(appNavigatorPages, appNavigatorConfig);

function urlToPathAndParams(url: string) {
  const params = {};
  const URIPrefix = appNavigatorConfig.URIPrefix;
  const delimiter = URIPrefix || '://';
  let path = url.split(delimiter)[1];
  if (!path) {
    path = url;
  }
  return {
    path,
    params,
  };
}

class Scenes extends Component {
  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
    Linking.getInitialURL().then((url: string) => {
      if (url) {
        this._handleOpenURL(url);
      }
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL = ({ url }: { url: string }) => {
    const parsedUrl = urlToPathAndParams(url);
    if (parsedUrl) {
      const { path, params } = parsedUrl;
      const action = AppNavigator.router.getActionForPathAndParams(path, params);
      if (action) {
        this.props.dispatch(action);
      }
    }
  };

  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigation,
        })}
      />
    );
  }
}

export default connect(state => ({
  navigation: state.navigation,
}))(Scenes);
