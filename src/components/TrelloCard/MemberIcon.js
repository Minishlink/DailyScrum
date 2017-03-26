// @flow
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import appStyle from 'DailyScrum/src/appStyle';

const colors = ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'];

export default (props: PropsType) => {
  const color = props.initials ? colors[props.initials.charCodeAt(0) % 9] : colors[0];
  // TODO show avatar 'https://trello-avatars.s3.amazonaws.com/{{hash}}/{{size}}.png'
  return <View style={[styles.container, { backgroundColor: color }]}><Text style={styles.text}>{props.initials}</Text></View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 3,
  },
  text: {
    fontWeight: '700',
    color: appStyle.colors.text,
  },
});

type PropsType = {
  initials: ?string,
};
