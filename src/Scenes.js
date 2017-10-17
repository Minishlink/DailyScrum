// @flow
import React, { Component } from 'react';
import { Linking, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import {
  StackNavigator,
  TabNavigator,
  TabBarTop,
  addNavigationHelpers,
  DrawerNavigator,
  NavigationActions,
} from 'react-navigation';
import * as Pages from 'DailyScrum/src/pages';
import appStyle from 'DailyScrum/src/appStyle';
import { Header, Drawer, Icon, Gradient } from './components';
import { ProjectHeaderTitle, DrawerHeaderLeft } from './components/Header';
import { getFontStyle } from './components/Text';

const TabsNavigator = TabNavigator(
  {
    project: {
      screen: Pages.Project.Summary,
      navigationOptions: {
        tabBarLabel: 'Project',
        tabBarIcon: ({ tintColor }) => <Icon name="folder" size={24} type="material" color={tintColor} />,
      },
    },
    sprint: {
      screen: Pages.Sprint.Summary,
      navigationOptions: {
        tabBarLabel: 'Sprint',
        tabBarIcon: ({ tintColor }) => <Icon name="trending-up" size={24} type="material" color={tintColor} />,
      },
    },
    daily: {
      screen: Pages.Daily,
      navigationOptions: {
        tabBarLabel: 'Daily',
        tabBarIcon: ({ tintColor }) => <Icon name="today" size={24} type="material" color={tintColor} />,
      },
    },
  },
  {
    initialRouteName: 'daily',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarComponent: props => (
      <Gradient>
        <TabBarTop {...props} />
      </Gradient>
    ),
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      upperCaseLabel: false,
      tabStyle: {
        height: 56,
      },
      style: {
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        borderRadius: 0, // fixes TouchableNativeFeedback Ripple effect
        elevation: 0, // fixes weird shadows
      },
      indicatorStyle: {
        height: 4,
        top: 0,
        backgroundColor: 'white',
      },
      labelStyle: {
        marginVertical: 0,
        ...getFontStyle({
          fontFamily: appStyle.font.family,
        }),
      },
    },
  }
);

const TabsStackNavigator = StackNavigator(
  {
    tabs: {
      screen: TabsNavigator,
      navigationOptions: navigationProps => ({
        headerTitle: <ProjectHeaderTitle />,
        headerLeft: <DrawerHeaderLeft {...navigationProps} />,
      }),
    },
    projectSettings: { screen: Pages.Settings.Project },
    about: { screen: Pages.Settings.About },
  },
  {
    navigationOptions: {
      header: props => <Header {...props} />,
      headerStyle: { backgroundColor: 'transparent', borderBottomWidth: 0, elevation: 0 },
      headerTintColor: appStyle.colors.overPrimaryColor,
      headerTitleStyle: {
        fontSize: appStyle.font.size.big,
        ...getFontStyle({
          fontFamily: appStyle.font.family,
          fontWeight: 'bold',
        }),
      },
    },
  }
);

const MainNavigator = DrawerNavigator(
  {
    tabsStack: {
      screen: TabsStackNavigator,
    },
  },
  {
    contentComponent: Drawer,
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
    navigationOptions: { header: null },
  },
};

const appNavigatorConfig = {
  initialRouteName: 'login',
  URIPrefix: 'dailyscrum://',
  cardStyle: {
    backgroundColor: appStyle.colors.primary,
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

class Scenes extends Component<any, any> {
  backPressListener: ?{
    remove: () => void,
  } = null;

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
    Linking.getInitialURL().then((url: ?string) => {
      if (url) {
        this._handleOpenURL({ url });
      }
    });

    this.backPressListener = BackHandler.addEventListener('backPress', () =>
      this.props.dispatch(NavigationActions.back())
    );
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
    this.backPressListener && this.backPressListener.remove();
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
