// @flow
import React from 'react';
import { Text } from 'react-native';
import { Card } from 'DailyScrum/src/components';

export default (props: PropsType) =>
  <Card>
    <Text style={{ color: props.lead.points >= 0 ? 'green' : 'red' }}>
      {`${props.lead.points >= 0 ? 'Lead' : 'Lateness'}: ${props.lead.points > 0
        ? props.lead.points
        : -props.lead.points} pts / ${props.lead.manDays > 0 ? props.lead.manDays : -props.lead.manDays} man-days`}
    </Text>
  </Card>;

type PropsType = {
  lead: {
    points: number,
    manDays: number,
  },
};
