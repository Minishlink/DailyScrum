// @flow
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Header as RNHeader } from 'react-navigation';
import Gradient from '../Gradient';
import { STATUSBAR_HEIGHT } from '../../appStyle';
import createErrorBar from '../ErrorBar';
const ErrorBar = createErrorBar();

export default class BaseHeader extends PureComponent<any> {
  render() {
    return (
      <Gradient>
        <ErrorBar style={styles.errorBar} />
        <RNHeader {...this.props} />
      </Gradient>
    );
  }
}

const styles = StyleSheet.create({
  errorBar: {
    top: 0,
    paddingTop: STATUSBAR_HEIGHT,
  },
});
