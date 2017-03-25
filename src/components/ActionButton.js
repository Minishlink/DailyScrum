import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import appStyle from 'DailyScrum/src/appStyle';

export default (props: PropsType) => (
  <TouchableOpacity style={styles.container} onPress={props.onPress || (() => {})}>
    <Text style={styles.text}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: appStyle.colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: appStyle.colors.primaryDark,
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: appStyle.font.size.large,
  },
});

type PropsType = {
  onPress: Function,
  title: string,
  icon?: string,
  iconType?: string,
};
