// @flow
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default (props: PropsType) => {
  return <View style={styles.container}><Text style={styles.text}>{props.points}</Text></View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006580',
    borderColor: '#005B72',
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  text: {
    color: '#E1FAFB',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

type PropsType = {
  points: number,
};
