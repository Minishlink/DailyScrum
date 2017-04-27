// @flow
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { TrelloCard, MemberIcon } from 'DailyScrum/src/components';
import { teamSelector } from 'DailyScrum/src/modules/sprints/reducer';
import type { CardListsType } from 'DailyScrum/src/modules/cards/reducer';
import { currentUserSelector } from 'DailyScrum/src/modules/users/reducer';
import type { ScrumbleTeamMemberType, ScrumbleTeamType } from 'DailyScrum/src/types/Scrumble/common';
import { roundToDecimalPlace } from '../services/MathService';
import type { UserType, CardType } from '../types';

class CardsList extends Component {
  props: PropsType;
  state: StateType;

  // Use FlatList / SectionList when 0.43 out

  // TODO identify unchecked checklists
  // TODO extract and show post estimated points
  // TODO show labels
  // TODO on click show attachments
  // TODO on click show description

  constructor(props) {
    super(props);

    let cards = [];
    Object.values(props.cardLists).forEach(list => list.forEach(card => cards.push(card)));
    this.state = { cards, filterableMembers: [], filteredMember: null, isRefreshing: false };
  }

  componentDidMount() {
    const filterableMembers = this.getFilterableMembers();
    const filteredMember = this.props.user && filterableMembers.includes(this.props.user.id)
      ? this.props.user.id
      : null;
    this.setState({ filterableMembers, filteredMember });
  }

  handleRefresh = () => {
    this.setState({ isRefreshing: true }, () => {
      this.props.onRefresh().then(() => {
        this.setState({
          isRefreshing: false,
          filterableMembers: this.getFilterableMembers(),
          filteredMember: null,
        });
      });
    });
  };

  getFilterableMembers = () => {
    let members = {};
    for (let card of this.state.cards) {
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
    const { team } = this.props;
    const { cards } = this.state;
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

  renderCardList = ([listKey, cards]: [string, Array<CardType>]) => {
    cards = cards.filter(
      card => (this.state.filteredMember ? card.idMembers.includes(this.state.filteredMember) : true)
    );

    if (cards.length) {
      return (
        <View key={listKey}>
          <Text>{listKey}</Text>
          {cards.map(card => <View key={card.idShort}><TrelloCard card={card} /></View>)}
        </View>
      );
    }
  };

  render() {
    const { team, cardLists } = this.props;
    const { cards } = this.state;
    if (!cards.length)
      return <View style={this.props.style}><Text style={styles.noCardsText}>No cards yet</Text></View>;
    return (
      <ScrollView
        contentContainerStyle={this.props.style}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.handleRefresh} />}
      >
        <View style={styles.filterContainer}>
          {team && this.state.filterableMembers.map(this.renderFilterableMember)}
        </View>
        {Object.entries(cardLists).map(this.renderCardList)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  noCardsText: {
    textAlign: 'center',
  },
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
  cards: CardType[],
};

type PropsType = {
  style?: any,
  cardLists: CardListsType,
  onRefresh: Function,
  team: ?ScrumbleTeamType,
  user: ?UserType,
};

const mapStateToProps = state => ({
  team: teamSelector(state),
  user: currentUserSelector(state),
});

export default connect(mapStateToProps)(CardsList);
