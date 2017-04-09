// @flow
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { TrelloCard, MemberIcon } from 'DailyScrum/src/components';
import { teamSelector } from 'DailyScrum/src/modules/sprints/reducer';
import type { CardType } from 'DailyScrum/src/modules/cards/reducer';
import type { ScrumbleTeamMemberType, ScrumbleTeamType } from 'DailyScrum/src/types/Scrumble/common';

class CardsList extends Component {
  props: PropsType;
  state: StateType = { filterableMembers: [], filteredMember: null, isRefreshing: false };

  // Use FlatList / SectionList when 0.43 out

  // TODO filter by me per default
  // TODO identify unchecked checklists
  // TODO extract and show post estimated points
  // TODO show labels
  // TODO on click show attachments
  // TODO on click show description

  componentDidMount() {
    this.setState({ filterableMembers: this.getFilterableMembers() });
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

  render() {
    const { cards } = this.props;

    return (
      <ScrollView
        contentContainerStyle={this.props.style}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.handleRefresh} />}
      >
        <View style={styles.filterContainer}>
          {this.props.team &&
            this.state.filterableMembers.map(member => (
              <TouchableOpacity key={member} onPress={() => this.filterMember(member)}>
                <View style={this.state.filteredMember && this.state.filteredMember !== member && { opacity: 0.6 }}>
                  <MemberIcon member={this.props.team.find(teamMember => teamMember.id === member)} />
                </View>
              </TouchableOpacity>
            ))}
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
};

const mapStateToProps = state => ({
  team: teamSelector(state),
});

export default connect(mapStateToProps)(CardsList);
