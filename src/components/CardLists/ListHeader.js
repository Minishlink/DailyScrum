// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

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
    return (
      <View>
        <Text style={styles.listName}>{this.getListNameFromKey(this.props.listKey)}</Text>
        <Text style={styles.total}>total {this.props.total.toLocaleString()} pts</Text>
      </View>
    );
  }
}

type PropsType = {
  style?: any,
  listKey: string,
  total: number,
};

const styles = StyleSheet.create({
  listName: {
    fontSize: 18,
    textAlign: 'center',
  },
  total: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
  },
});
