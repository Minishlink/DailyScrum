// @flow
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MemberIcon } from 'DailyScrum/src/components';
import { roundToDecimalPlace } from '../../services/MathService';
import type { CardType, UserType } from '../../types';
import appStyle from 'DailyScrum/src/appStyle';

export default class FilterableMember extends Component {
  props: PropsType;

  render() {
    const { member, cards } = this.props;
    // TODO FUTURE remove the toString of the points when RN 0.44 is out (https://github.com/facebook/react-native/issues/13080)
    return (
      <View key={member.id} style={this.props.style}>
        <TouchableOpacity
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          onPress={() => this.props.onFilter(member.id)}
        >
          <View style={!this.props.isFiltered && { opacity: 0.6 }}>
            <MemberIcon member={member} />
          </View>
        </TouchableOpacity>
        <Text style={styles.filterableMemberPoints}>
          {cards
            .reduce(
              (total: number, card: CardType) =>
                total + (card.points ? roundToDecimalPlace(card.points / card.idMembers.length) : 0),
              0
            )
            .toString()}
        </Text>
      </View>
    );
  }
}

type PropsType = {
  style?: any,
  isFiltered: boolean,
  member: UserType,
  cards: CardType[],
  onFilter: (memberId: string) => void,
};

const styles = StyleSheet.create({
  filterableMemberPoints: {
    marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#006580',
  },
});
