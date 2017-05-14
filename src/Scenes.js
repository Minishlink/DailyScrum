// @flow

import React, { Component } from 'react';
import { Linking, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, TabBarTop, addNavigationHelpers } from 'react-navigation';
import * as Pages from 'DailyScrum/src/pages';
import appStyle from 'DailyScrum/src/appStyle';
import { Header, Icon } from './components';

const sectionsNavigatorConfig = {
  initialRouteName: 'summary',
  swipeEnabled: true,
  animationEnabled: true,
  lazy: true,
  tabBarComponent: props => <View />,
};

const DailyNavigator = TabNavigator(
  {
    yesterday: { screen: Pages.Daily.Yesterday },
    summary: { screen: Pages.Daily.Summary },
    today: { screen: Pages.Daily.Today },
  },
  sectionsNavigatorConfig
);

const SprintNavigator = TabNavigator(
  {
    summary: { screen: Pages.Sprint.Summary },
  },
  sectionsNavigatorConfig
);

const ProjectNavigator = TabNavigator(
  {
    summary: { screen: Pages.Project.Summary },
  },
  sectionsNavigatorConfig
);

const MainNavigator = TabNavigator(
  {
    project: {
      screen: ProjectNavigator,
      navigationOptions: {
        tabBarLabel: 'Project',
        tabBarIcon: ({ tintColor }) => <Icon name="folder" size={24} type="material" color={tintColor} />,
      },
    },
    sprint: {
      screen: SprintNavigator,
      navigationOptions: {
        tabBarLabel: 'Sprint',
        tabBarIcon: ({ tintColor }) => <Icon name="trending-up" size={24} type="material" color={tintColor} />,
      },
    },
    daily: {
      screen: DailyNavigator,
      navigationOptions: {
        tabBarLabel: 'Daily',
        tabBarIcon: ({ tintColor }) => <Icon name="today" size={24} type="material" color={tintColor} />,
      },
    },
  },
  {
    initialRouteName: 'daily',
    swipeEnabled: false,
    animationEnabled: Platform.OS === 'ios', // TODO FUTURE enable on Android when react-navigation bug is fixed
    tabBarComponent: TabBarTop,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      upperCaseLabel: false,
      tabStyle: {
        height: 56,
      },
      labelStyle: {
        marginVertical: 0,
      },
    },
  }
);

const appNavigatorPages = {
  login: {
    screen: Pages.Login,
    path: 'login#token=:token',
    navigationOptions: { header: null },
  },
  main: {
    screen: MainNavigator,
    navigationOptions: {
      header: props => <Header {...props} />,
    },
  },
  projectSettings: { screen: Pages.Settings.Project },
};

const appNavigatorConfig = {
  initialRouteName: 'login',
  URIPrefix: 'dailyscrum://',
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
