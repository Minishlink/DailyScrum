// @flow
import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import type { UserType } from '../../types';
import { FilterableMember } from './';
import { makeFilterByMember, filteredMemberSelector, filterableMembersSelector } from '../../modules/cardLists';
import type { CardListsKeyType } from '../../modules/cardLists/reducer';
import { userPointsSelector } from '../../modules/cardLists/selectors';

export class FilterMembers extends Component {
  props: PropsType;

  shouldComponentUpdate(nextProps: PropsType) {
    return (
      nextProps.filtered !== this.props.filtered ||
      !isEqual(nextProps.filterable, this.props.filterable) ||
      !isEqual(nextProps.userPoints, this.props.userPoints)
    );
  }

  renderFilterableMember = ({ item: user }: { item: UserType }) => (
    <FilterableMember
      style={styles.filterableMemberContainer}
      member={user}
      points={this.props.userPoints[user.id]}
      isFiltered={!this.props.filtered || this.props.filtered === user.id}
      onFilter={memberId => this.props.filterByMember(this.props.filtered === memberId ? null : memberId)}
    />
  );

  render() {
    if (!this.props.filterable.length) return null;
    return (
      <View style={[styles.container, this.props.style]}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={this.props.filterable}
          renderItem={this.renderFilterableMember}
          keyExtractor={user => user.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

type PropsType = {
  style?: any,
  contentContainerStyle?: any,
  filtered: ?string,
  filterable: UserType[],
  filterByMember: Function,
  userPoints: { [userId: string]: number },
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  filterableMemberContainer: {
    marginHorizontal: 4,
  },
});

export default (cardListsKey: CardListsKeyType) => {
  const mapStateToProps = state => ({
    filtered: filteredMemberSelector(state, cardListsKey),
    filterable: filterableMembersSelector(state, cardListsKey),
    userPoints: userPointsSelector(state, cardListsKey),
  });

  const mapDispatchToProps = {
    filterByMember: makeFilterByMember(cardListsKey),
  };

  return connect(mapStateToProps, mapDispatchToProps)(FilterMembers);
};
