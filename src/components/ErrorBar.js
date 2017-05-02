import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import _ from 'lodash';
import { errorsSelector } from '../modules/sync';
import { STATUSBAR_HEIGHT } from '../appStyle';

class ErrorBar extends Component {
  getErrorMessage = (error: string) => {
    switch (error) {
      case 'Network request failed':
      case 'Timeout':
        return 'Connection failed. Please try again later :)';

      default:
        return `Error: ${error}`;
    }
  };

  render() {
    if (!this.props.errors.length) return null;
    const errors = _.uniq(this.props.errors.map(this.getErrorMessage));
    return <View style={styles.container}><Text style={styles.text}>{errors.map(error => error)}</Text></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    position: 'absolute',
    width: Dimensions.get('window').width,
    paddingTop: STATUSBAR_HEIGHT,
    paddingBottom: 2,
    backgroundColor: 'orange',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});

export default (name?: string, key?: string) => {
  const mapStateToProps = state => ({
    errors: errorsSelector(state, name, key),
  });

  return connect(mapStateToProps)(ErrorBar);
};
