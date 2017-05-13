import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Dimensions, Platform } from 'react-native';
import _ from 'lodash';
import { errorsSelector } from '../modules/sync';

class ErrorBar extends Component {
  props: PropsType;
  state: StateType = { show: false };

  getErrorMessage = (error: string) => {
    switch (error) {
      case 'Network request failed':
      case 'Timeout':
        return 'Connection failed. Please try again later :)';
      default:
        return `Error: ${error}`;
    }
  };

  componentWillReceiveProps(nextProps: PropsType) {
    if (!_.isEqual(nextProps.errors, this.props.errors)) {
      clearTimeout(this.timeout);
      const show = nextProps.errors.length;
      this.setState({ show });
      if (show) {
        this.timeout = setTimeout(() => this.setState({ show: false }), 5000);
      }
    }
  }

  render() {
    if (!this.state.show) return null;
    const errors = _.uniq(this.props.errors.map(this.getErrorMessage));
    return (
      <View style={styles.container}>
        {errors.map(error => <Text key={error} style={styles.text}>{error}</Text>)}
      </View>
    );
  }
}

type PropsType = {
  errors: string[],
};

type StateType = {
  show: boolean,
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        zIndex: 999,
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 2,
      },
    }),
    position: 'absolute',
    width: Dimensions.get('window').width,
    paddingVertical: 2,
    backgroundColor: 'orange',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});

export default (wantedErrors?: WantedErrorsType) => {
  const mapStateToProps = state => {
    let selectErrors = [];

    if (wantedErrors) {
      Object.entries(wantedErrors).forEach(([name, key]) => {
        if (key === true) {
          selectErrors.push([name]);
        } else if (Array.isArray(key)) {
          key.forEach(key => selectErrors.push([name, key]));
        } else {
          selectErrors.push([name, key]);
        }
      });
    } else {
      selectErrors.push([]);
    }

    return {
      errors: _.flatten(selectErrors.map(([name, key]) => errorsSelector(state, name, key))),
    };
  };

  return connect(mapStateToProps)(ErrorBar);
};

/*
 * can be
 * { boards: true } // all errors from boards
 * { projects: 'change' } // only the change error from projects
 * { boards: true, projects: 'change' } // both above errors
 * { cards: ['done', 'notDone'] }
 */
type WantedErrorsType = {
  [name: string]: true | string | string[],
};
