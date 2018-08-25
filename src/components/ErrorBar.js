import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import { uniq, isEqual, flatten } from 'lodash';
import { Text } from './';
import { errorsSelector, clearErrors } from '../modules/sync';

class ErrorBar extends Component {
  props: PropsType;

  getErrorMessage = (error: string) => {
    switch (error) {
      case 'Network request failed':
      case 'Failed to fetch':
      case 'Timeout':
        return 'Connection failed. Please try again later :)';
      case 'NOT_SCRUMBLE_PROJECT':
        return 'DailyScrum does not let you create a new project at the moment. Please do it on Scrumble.';
      case 'cancelled':
        return null;
      default:
        return `Error: ${error}`;
    }
  };

  shouldComponentUpdate(nextProps: PropsType) {
    return !isEqual(nextProps.errors, this.props.errors);
  }

  componentWillReceiveProps(nextProps: PropsType) {
    if (!isEqual(nextProps.errors, this.props.errors)) {
      this.timeout && clearTimeout(this.timeout);
      if (nextProps.errors.length) {
        this.timeout = setTimeout(this.props.clearErrors, 5000);
      }
    }
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  }

  render() {
    if (!this.props.errors.length) return null;
    const errors = uniq(this.props.errors.map(this.getErrorMessage)).filter(Boolean);
    if (!errors.length) return null;
    return (
      <View style={[styles.container, this.props.style]}>
        {errors.map(error => (
          <Text key={error} style={styles.text}>
            {error}
          </Text>
        ))}
      </View>
    );
  }
}

type PropsType = {
  errors: string[],
  clearErrors: Function,
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

export default (wantedErrors?: ErrorBarOptionsType) => {
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
      errors: flatten(selectErrors.map(([name, key]) => errorsSelector(state, name, key))),
    };
  };

  const mapDispatchToProps = {
    clearErrors, // TODO target only the wantedErrors
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ErrorBar);
};

/*
 * can be
 * { boards: true } // all errors from boards
 * { projects: 'change' } // only the change error from projects
 * { boards: true, projects: 'change' } // both above errors
 * { cards: ['done', 'notDone'] }
 */
export type ErrorBarOptionsType = {
  [name: string]: true | string | string[],
};
