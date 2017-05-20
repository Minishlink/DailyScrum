// @flow
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card } from 'DailyScrum/src/components';
import appStyle from 'DailyScrum/src/appStyle';
import MemberIcon from './MemberIcon';
import PointsBadge from './PointsBadge';
import type { CardType } from '../../types';

export default ({ card }: PropsType) => (
  <Card>
    <View style={styles.labelsRow}>
      <View style={styles.idShortContainer}>
        <Text style={styles.idShort}>#{card.idShort}</Text>
      </View>
    </View>
    <Text style={styles.title}>
      {card.name}
    </Text>
    <View style={styles.membersRow}>
      {card.points !== null &&
        <View style={styles.pointsContainer}>
          <PointsBadge points={(card.points || 0).toLocaleString()} />
        </View>}
      <View style={styles.membersContainer}>
        <View style={styles.members}>
          {card.members.map(member => (
            <View key={member.id} style={styles.member}><MemberIcon member={member} /></View>
          ))}
        </View>
      </View>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  membersRow: {
    flexDirection: 'row',
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
  card: CardType,
};
