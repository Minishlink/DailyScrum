// @flow

import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import type { NavigationScreenProp } from 'react-navigation';
import * as Pages from 'DailyScrum/src/pages';

export const AppNavigator = StackNavigator(
  {
    home: {
      screen: Pages.Home,
      path: 'login#token=:token',
    },
    board: {
      screen: Pages.Board,
    },
  },
  {
    initialRouteName: 'home',
    URIPrefix: 'dailyscrum://',
    headerMode: 'none',
  }
);

const Scenes = (props) => (
  <AppNavigator navigation={addNavigationHelpers({
    dispatch: props.dispatch,
    state: props.navigation,
  })} />
);

export default connect(state => ({
  navigation: state.navigation,
}))(Scenes);
