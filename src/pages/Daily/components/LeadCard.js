// @flow
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card } from 'DailyScrum/src/components';

export default (props: PropsType) =>
  <Card>
    <View style={styles.container}>
      <Image source={{ uri: props.lead.points >= 0 ? 'sun' : 'sun_sad' }} style={styles.image} />
      <Text style={{ color: props.lead.points >= 0 ? 'green' : 'red' }}>
        {`${props.lead.points >= 0 ? 'Lead' : 'Lateness'}: ${props.lead.points > 0
          ? props.lead.points
          : -props.lead.points} pts / ${props.lead.manDays > 0 ? props.lead.manDays : -props.lead.manDays} man-days`}
      </Text>
    </View>
  </Card>;

type PropsType = {
  lead: {
    points: number,
    manDays: number,
  },
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    aspectRatio: 1,
    marginRight: 10,
  },
});
