// @flow
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { MemberIcon, Text, Button } from '../../components';
import type { UserType } from '../../types';
import { roundToDecimalPlace } from '../../services/MathService';

export default class FilterableMember extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
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
        <Button hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }} onPress={this.onFilter}>
          <View style={!this.props.isFiltered && { opacity: 0.6 }}>
            <MemberIcon member={member} size={40} />
          </View>
        </Button>
        <Text style={styles.filterableMemberPoints}>{roundToDecimalPlace(points).toLocaleString()}</Text>
      </View>
    );
  }
}

type Props = {
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
  },
});
