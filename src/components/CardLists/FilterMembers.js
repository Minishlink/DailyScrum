// @flow
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { currentUserSelector } from 'DailyScrum/src/modules/users/reducer';
import { teamSelector } from 'DailyScrum/src/modules/sprints/reducer';
import type { CardType, UserType, TeamType } from '../../types';
import { FilterableMember } from './';

class FilterMembers extends Component {
  state: StateType = { filterable: [] };
  props: PropsType;

  componentDidMount() {
    this.configure(this.props, true);
  }

  componentWillReceiveProps(nextProps: PropsType) {
    if (nextProps.cards !== this.props.cards) {
      if (
        nextProps.cards.length !== this.props.cards.length ||
        !_.isEqual(nextProps.cards.map(card => card.id).sort(), this.props.cards.map(card => card.id).sort())
      ) {
        this.configure(nextProps);
        return;
      }
    }
  }

  getFilterableMembers = (cards: CardType[]) => {
    let members = {};
    for (let card of cards) {
      for (let member of card.idMembers) {
        members[member] = true;
      }
    }
    return Object.keys(members);
  };

  configure = (props: PropsType, init: boolean = false) => {
    const filterableMembers = this.getFilterableMembers(this.props.cards);
    const filteredMember = this.props.filtered && filterableMembers.includes(this.props.filtered)
      ? this.props.filtered
      : init && this.props.user && filterableMembers.includes(this.props.user.id) ? this.props.user.id : null;

    this.setState({
      filterable: filterableMembers,
    });

    this.props.onFilter(filteredMember);
  };

  renderFilterableMember = (memberId: string) => {
    const { team } = this.props;
    const member = team && team.find(teamMember => teamMember && teamMember.id === memberId);
    const cards = this.props.cards.filter(card => card.idMembers.includes(memberId));
    if (!member || !cards.length) return;
    return (
      <FilterableMember
        key={member.id}
        style={styles.filterableMemberContainer}
        member={member}
        cards={cards}
        isFiltered={!this.props.filtered || this.props.filtered === memberId}
        onFilter={this.props.onFilter}
      />
    );
  };

  render() {
    return (
      <View style={this.state.filterable.length && styles.container}>
        <ScrollView contentContainerStyle={this.props.style} horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.state.filterable.map(this.renderFilterableMember)}
        </ScrollView>
      </View>
    );
  }
}

type StateType = {
  filterable: string[],
};

type PropsType = {
  style?: any,
  team: ?TeamType,
  cards: CardType[],
  filtered: ?string,
  onFilter: (memberId: ?string) => void,
  user: ?UserType,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
    marginBottom: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    backgroundColor: 'white',
  },
  filterableMemberContainer: {
    marginHorizontal: 4,
  },
});

const mapStateToProps = state => ({
  team: teamSelector(state),
  user: currentUserSelector(state),
});

export default connect(mapStateToProps)(FilterMembers);
