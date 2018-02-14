// @flow
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from '../../../components';
import appStyle from '../../../appStyle';

export default class QualityIndicators extends Component<Props> {
  renderCount = (count: number) => (
    <Text style={[styles.count, count === 0 ? styles.standardOK : styles.standardKO]}>{count}</Text>
  );

  render() {
    const bugs = 2;
    const validationFeedbacks = 0;
    return (
      <View style={[styles.container, this.props.style]}>
        <Card style={[styles.card, styles.firstCard]}>
          {this.renderCount(bugs)}
          <Text>bugs</Text>
        </Card>
        <Card style={styles.card}>
          {this.renderCount(validationFeedbacks)}
          <Text>validation feedbacks</Text>
        </Card>
      </View>
    );
  }
}

type Props = {
  style?: any,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  firstCard: {
    marginRight: 2 * (appStyle.margin - appStyle.shadow.radius),
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2 * appStyle.margin,
  },
  count: {
    marginRight: appStyle.margin,
    fontSize: 1.5 * appStyle.font.size.big,
    fontWeight: 'bold',
  },
  standardOK: {
    color: appStyle.colors.green,
  },
  standardKO: {
    color: appStyle.colors.red,
  },
});
