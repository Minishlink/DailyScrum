// @flow
import React, { PureComponent } from 'react';
import AppNavigator from './AppNavigator';

class Routing extends PureComponent<Props> {
  render() {
    return (
      <AppNavigator
        uriPrefix={this.props.uriPrefix}
        ref={this.props.setNavigatorRef}
        onNavigationStateChange={this.props.onNavigationStateChange}
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
