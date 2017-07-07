// @flow
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MemberIcon } from 'DailyScrum/src/components';
import type { UserType } from '../../types';
import appStyle from '../../appStyle';

export default class FilterableMember extends Component {
  props: PropsType;

  render() {
    const { member, points } = this.props;
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
          {points.toLocaleString()}
        </Text>
      </View>
    );
  }
}

type PropsType = {
  style?: any,
  isFiltered: boolean,
  member: UserType,
  points: number,
  onFilter: (memberId: string) => void,
};

const styles = StyleSheet.create({
  filterableMemberPoints: {
    marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    color: appStyle.colors.points,
  },
});
