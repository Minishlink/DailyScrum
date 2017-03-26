// @flow
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'DailyScrum/src/components';
import appStyle from 'DailyScrum/src/appStyle';
import MemberIcon from './MemberIcon';

// TODO connect this to store instead of passing every props by hand?

export default (props: PropsType) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {props.isSprintGoal &&
          <View style={styles.iconContainer}>
            <Icon name="star" size={30} color="#e6c60d" />
          </View>}
        <Text style={[styles.title, props.isSprintGoal && { fontSize: appStyle.font.size.big, fontWeight: 'bold' }]}>
          {props.title}
        </Text>
        {props.members &&
          <View style={styles.members}>
            {props.members.map(member => (
              <View key={member.id} style={styles.member}><MemberIcon initials={member.initials} /></View>
            ))}
          </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4, // shadow
    marginVertical: 4, // shadow
  },
  card: {
    minHeight: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 3,
    elevation: 2,
    shadowColor: appStyle.colors.darkGray,
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: { height: 1 },
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
  members: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  member: {
    marginLeft: 5,
  },
});

type PropsType = {
  title: string,
  isSprintGoal?: boolean,
  members?: any[],
};
