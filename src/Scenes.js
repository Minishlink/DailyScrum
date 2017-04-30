// @flow

import React, { Component } from 'react';
import { Linking, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, TabBarTop, addNavigationHelpers } from 'react-navigation';
import * as Pages from 'DailyScrum/src/pages';
import appStyle from 'DailyScrum/src/appStyle';

const sectionsNavigatorConfig = {
  initialRouteName: 'summary',
  swipeEnabled: true,
  animationEnabled: true,
  lazy: true,
  tabBarComponent: props => <View />,
};

const DailyNavigator = TabNavigator(
  {
    summary: { screen: Pages.Daily.Summary },
    yesterday: { screen: Pages.Daily.Yesterday },
    today: { screen: Pages.Daily.Today },
    problems: { screen: Pages.Daily.Problems },
  },
  sectionsNavigatorConfig
);

const SprintNavigator = TabNavigator(
  {
    settings: { screen: Pages.Sprint.Settings },
    summary: { screen: Pages.Sprint.Summary },
  },
  sectionsNavigatorConfig
);

const ProjectNavigator = TabNavigator(
  {
    settings: { screen: Pages.Project.Settings },
    summary: { screen: Pages.Project.Summary },
  },
  sectionsNavigatorConfig
);

const MainNavigator = TabNavigator(
  {
    project: { screen: ProjectNavigator },
    sprint: { screen: SprintNavigator },
    daily: { screen: DailyNavigator },
  },
  {
    initialRouteName: 'daily',
    swipeEnabled: false,
    animationEnabled: Platform.OS === 'ios', // TODO FUTURE enable on Android when react-navigation bug is fixed
    tabBarComponent: TabBarTop,
    tabBarPosition: 'bottom',
  }
);

const appNavigatorPages = {
  login: {
    screen: Pages.Login,
    path: 'login#token=:token',
  },
  main: {
    screen: MainNavigator,
  },
};

const appNavigatorConfig = {
  initialRouteName: 'login',
  URIPrefix: 'dailyscrum://',
  headerMode: 'none',
  cardStyle: {
    backgroundColor: appStyle.colors.background,
  },
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
        this._handleOpenURL({ url });
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
