// @flow
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class ListHeader extends Component {
  props: PropsType;

  getListNameFromKey = (key: string) => {
    switch (key) {
      case 'sprint':
        return 'Backlog';
      case 'doing':
        return 'Doing';
      case 'blocked':
        return 'Blocked';
      case 'toValidate':
        return 'To validate';
      case 'done':
        return 'Done';
      default:
        return key;
    }
  };

  render() {
    return <Text style={styles.listName}>{this.getListNameFromKey(this.props.listKey)}</Text>;
  }
}

type PropsType = {
  style?: any,
  listKey: string,
};

const styles = StyleSheet.create({
  listName: {
    fontSize: 18,
    textAlign: 'center',
  },
});
