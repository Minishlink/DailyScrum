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
      <Text style={[styles.title, props.isSprintGoal && { fontSize: appStyle.font.size.big, fontWeight: 'bold' }]}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 3,
    elevation: 1,
    shadowColor: appStyle.colors.darkGray,
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: appStyle.font.size.default,
    color: appStyle.colors.text,
    textAlign: 'center',
  },
});

type PropsType = {
  title: string,
  isSprintGoal?: boolean,
};
