// @flow
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MemberIcon } from 'DailyScrum/src/components';
import type { UserType } from '../../types';
import appStyle from '../../appStyle';
import { roundToDecimalPlace } from '../../services/MathService';

export default class FilterableMember extends Component {
  props: PropsType;

  shouldComponentUpdate(nextProps: PropsType) {
    return (
      nextProps.isFiltered !== this.props.isFiltered ||
      nextProps.points !== this.props.points ||
      nextProps.member.id !== this.props.member.id ||
      nextProps.points !== this.props.points
    );
  }

  onFilter = () => this.props.onFilter(this.props.member.id);

  render() {
    const { member, points } = this.props;
    return (
      <View key={member.id} style={this.props.style}>
        <TouchableOpacity hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }} onPress={this.onFilter}>
          <View style={!this.props.isFiltered && { opacity: 0.6 }}>
            <MemberIcon member={member} size={40} />
          </View>
        </TouchableOpacity>
        <Text style={styles.filterableMemberPoints}>
          {roundToDecimalPlace(points).toLocaleString()}
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
