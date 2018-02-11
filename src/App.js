// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import codePush from 'react-native-code-push';
import Scenes from './Scenes';
import createStore from './modules/store';

class App extends Component<void, State> {
  state = {
    store: null,
    reactNavigationAddListener: null,
  };

  componentDidMount() {
    createStore().then(({ store, reactNavigationAddListener }) => this.setState({ store, reactNavigationAddListener }));
  }

  render() {
    return this.state.store ? (
      <Provider store={this.state.store}>
        <Scenes reactNavigationAddListener={this.state.reactNavigationAddListener} />
      </Provider>
    ) : null;
  }
}

type State = {
  store: any,
  reactNavigationAddListener: ?Function,
};

export default (!__DEV__ ? codePush()(App) : App);
