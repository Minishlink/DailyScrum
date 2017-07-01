// @flow
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from 'DailyScrum/src/components';

export default (props: PropsType) => (
  <Card>
    <Text style={styles.text}>
      {props.pointsLeft > 0 ? `Left overall: ${props.pointsLeft} pts` : `Congratulations, this sprint is a success!`}
    </Text>
  </Card>
);

type PropsType = {
  pointsLeft: number,
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
