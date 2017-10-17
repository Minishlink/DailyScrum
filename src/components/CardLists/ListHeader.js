// @flow
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../components';
import appStyle from '../../appStyle';

export default class ListHeader extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.listKey !== this.props.listKey || nextProps.total !== this.props.total;
  }

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

type Props = {
  style?: any,
  listKey: string,
  total: number,
};

const styles = StyleSheet.create({
  listName: {
    textAlign: 'center',
  },
  total: {
    textAlign: 'center',
    color: '#666',
    fontSize: appStyle.font.size.small,
  },
});
