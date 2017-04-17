// @flow
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'DailyScrum/src/components';
import appStyle from 'DailyScrum/src/appStyle';
import MemberIcon from './MemberIcon';
import PointsBadge from './PointsBadge';
import type { CardType } from '../../types';

export default (props: PropsType) => (
  <View style={styles.container}>
    <View style={styles.card}>
      <View style={styles.labelsRow}>
        {props.card &&
          <View style={styles.idShortContainer}>
            <Text style={styles.idShort}>#{props.card.idShort}</Text>
          </View>}
      </View>
      {props.isSprintGoal &&
        <View style={styles.iconContainer}>
          <Icon name="star" size={30} color="#e6c60d" />
        </View>}
      <Text style={[styles.title, props.isSprintGoal && { fontSize: appStyle.font.size.big, fontWeight: 'bold' }]}>
        {props.card ? props.card.name : props.title}
      </Text>
      <View style={styles.membersRow}>
        {props.card &&
          props.card.points !== null &&
          <View style={styles.pointsContainer}>
            <PointsBadge points={props.card.points || 0} />
          </View>}
        {props.card &&
          <View style={styles.membersContainer}>
            <View style={styles.members}>
              {props.card.members.map(member => (
                <View key={member.id} style={styles.member}><MemberIcon member={member} /></View>
              ))}
            </View>
          </View>}
      </View>
    </View>
  </View>
);

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
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  membersRow: {
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: appStyle.font.size.default,
    color: appStyle.colors.text,
    textAlign: 'center',
    marginTop: 18,
    marginBottom: 10,
  },
  membersContainer: {
    flex: 5,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  members: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    right: -4,
  },
  member: {
    marginLeft: 5,
  },
  idShortContainer: {
    position: 'absolute',
    top: -4,
    left: -8,
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
  pointsContainer: {
    flex: 1,
    flexShrink: 1,
    left: -4,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});

type PropsType = {
  title?: string,
  isSprintGoal?: boolean,
  card?: CardType,
};
