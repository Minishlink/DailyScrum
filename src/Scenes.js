// @flow
import React, { PureComponent } from 'react';
import { Platform, Dimensions } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator, createDrawerNavigator } from 'react-navigation';
import { MaterialTopTabBar } from 'react-navigation-tabs';
import * as Pages from './pages';
import appStyle from './appStyle';
import { Header, Drawer, Icon, Gradient } from './components';
import { ProjectHeaderTitle, DrawerHeaderLeft } from './components/Header';
import { getFontStyle } from './components/Text';
import Navigation, { URIPrefix } from './services/Navigation';
import { Analytics } from './services';

const TabsNavigator = createMaterialTopTabNavigator(
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
        <MaterialTopTabBar {...props} />
      </Gradient>
    ),
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      upperCaseLabel: false,
      initialLayout:
        Platform.OS === 'android'
          ? {
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }
          : undefined,
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
        ...appStyle.shadowStyle,
        elevation: 0,
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

const TabsStackNavigator = createStackNavigator(
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

const MainNavigator = createDrawerNavigator(
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
    path: Platform.OS !== 'web' ? 'login#token=:token' : 'login&token=:token',
    navigationOptions: { header: null },
  },
  main: {
    screen: MainNavigator,
    navigationOptions: { header: null },
  },
};

const appNavigatorConfig = {
  initialRouteName: 'login',
  cardStyle: {
    backgroundColor: appStyle.colors.primary,
  },
};

export const AppNavigator = createStackNavigator(appNavigatorPages, appNavigatorConfig);

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
      <AppNavigator
        uriPrefix={URIPrefix}
        ref={this.setNavigatorRef}
        onNavigationStateChange={this.onNavigationStateChange}
      />
    );
  }
}

export default Scenes;
