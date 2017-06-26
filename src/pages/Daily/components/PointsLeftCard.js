// @flow
import React from 'react';
import { Text } from 'react-native';
import { Card } from 'DailyScrum/src/components';

export default (props: PropsType) => (
  <Card>
    <Text>
      {props.pointsLeft > 0
        ? `Left overall: ${props.pointsLeft} pts`
        : `Congratulations! You finished your sprint, and you have ${-props.pointsLeft} points of bonus.`}
    </Text>
  </Card>
);

type PropsType = {
  pointsLeft: number,
};
