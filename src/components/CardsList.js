// @flow
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { TrelloCard, MemberIcon } from 'DailyScrum/src/components';
import { teamSelector } from 'DailyScrum/src/modules/sprints/reducer';
import { currentUserSelector } from 'DailyScrum/src/modules/users/reducer';
import type { CardType } from 'DailyScrum/src/modules/cards/reducer';
import type { ScrumbleTeamMemberType, ScrumbleTeamType } from 'DailyScrum/src/types/Scrumble/common';
import { roundToDecimalPlace } from '../services/MathService';
import type { UserType } from '../types';

class CardsList extends Component {
  props: PropsType;
  state: StateType = { filterableMembers: [], filteredMember: null, isRefreshing: false };

  // Use FlatList / SectionList when 0.43 out

  // TODO identify unchecked checklists
  // TODO extract and show post estimated points
  // TODO show labels
  // TODO on click show attachments
  // TODO on click show description

  componentDidMount() {
    const filteredMember = this.props.user ? this.props.user.id : null;
    this.setState({ filterableMembers: this.getFilterableMembers(), filteredMember });
  }

  handleRefresh = () => {
    this.setState({ isRefreshing: true }, () => {
      this.props.onRefresh().then(() => {
        this.setState({ isRefreshing: false, filterableMembers: this.getFilterableMembers(), filteredMember: null });
      });
    });
  };

  getFilterableMembers = () => {
    let members = {};
    for (let card of this.props.cards) {
      for (let member of card.idMembers) {
        members[member] = true;
      }
    }
    return Object.keys(members);
  };

  filterMember = (member: ScrumbleTeamMemberType) => {
    this.setState({ filteredMember: this.state.filteredMember !== member ? member : null });
  };

  renderFilterableMember = (memberId: string) => {
    const { cards, team } = this.props;
    const member = team && team.find(teamMember => teamMember && teamMember.id === memberId);
    if (!member) return;

    return (
      <View key={memberId} style={styles.filterableMemberContainer}>
        <TouchableOpacity onPress={() => this.filterMember(memberId)}>
          <View style={this.state.filteredMember && this.state.filteredMember !== memberId && { opacity: 0.6 }}>
            <MemberIcon member={member} />
          </View>
        </TouchableOpacity>
        <Text style={styles.filterableMemberPoints}>
          {cards
            ? cards
                .filter(card => card.idMembers.includes(memberId))
                .reduce(
                  (total: number, card: CardType) =>
                    total + (card.points ? roundToDecimalPlace(card.points / card.idMembers.length) : 0),
                  0
                )
            : 0}
        </Text>
      </View>
    );
  };

  render() {
    const { cards, team } = this.props;
    return (
      <ScrollView
        contentContainerStyle={this.props.style}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.handleRefresh} />}
      >
        <View style={styles.filterContainer}>
          {team && this.state.filterableMembers.map(memberId => this.renderFilterableMember(memberId))}
        </View>
        {cards &&
          cards
            .filter(card => this.state.filteredMember ? card.idMembers.includes(this.state.filteredMember) : true)
            .map(card => <View key={card.idShort}><TrelloCard card={card} /></View>)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterableMemberPoints: {
    marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#006580',
  },
});

type StateType = {
  isRefreshing: boolean,
  filterableMembers: string[],
  filteredMember: ?string,
};

type PropsType = {
  style?: any,
  cards: CardType[],
  onRefresh: Function,
  team: ?ScrumbleTeamType,
  user: ?UserType,
};

const mapStateToProps = state => ({
  team: teamSelector(state),
  user: currentUserSelector(state),
});

export default connect(mapStateToProps)(CardsList);
