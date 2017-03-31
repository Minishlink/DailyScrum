// @flow
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'DailyScrum/src/components';
import appStyle from 'DailyScrum/src/appStyle';
import MemberIcon from './MemberIcon';
import type { CardType } from 'DailyScrum/src/modules/cards/reducer';

export default (props: PropsType) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {props.card &&
          <View style={styles.idShortContainer}>
            <Text style={styles.idShort}>#{props.card.idShort}</Text>
          </View>}
        {props.isSprintGoal &&
          <View style={styles.iconContainer}>
            <Icon name="star" size={30} color="#e6c60d" />
          </View>}
        <Text style={[styles.title, props.isSprintGoal && { fontSize: appStyle.font.size.big, fontWeight: 'bold' }]}>
          {props.card ? props.card.name : props.title}
        </Text>
        {props.card &&
          <View style={styles.members}>
            {props.card.members.map(member => (
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
    paddingVertical: 4,
    paddingHorizontal: 8,
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
    marginTop: 10,
  },
  title: {
    fontSize: appStyle.font.size.default,
    color: appStyle.colors.text,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  members: {
    marginTop: 5,
    flexDirection: 'row',
    right: -3,
    justifyContent: 'flex-end',
  },
  member: {
    marginLeft: 5,
  },
  idShortContainer: {
    position: 'absolute',
    top: 2,
    left: 2,
    zIndex: 1,
    backgroundColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    paddingHorizontal: 3,
    borderRadius: 3,
  },
  idShort: {
    fontSize: 11,
    fontWeight: 'bold',
  },
});

type PropsType = {
  title?: string,
  isSprintGoal?: boolean,
  card?: CardType,
};
