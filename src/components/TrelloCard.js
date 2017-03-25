// @flow
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from './';
import appStyle from 'DailyScrum/src/appStyle';

export default (props: PropsType) => {
  return (
    <View style={styles.container}>
      {props.isSprintGoal &&
        <View style={styles.iconContainer}>
          <Icon name="star" size={30} color="#e6c60d" />
        </View>}
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 3,
  },
  iconContainer: {
    alignItems: 'center',
  },
  title: {
    color: appStyle.colors.text,
  },
});

type PropsType = {
  title: string,
  isSprintGoal?: boolean,
};
