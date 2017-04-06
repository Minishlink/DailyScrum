// @flow
import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { TrelloCard } from 'DailyScrum/src/components';
import type { CardType } from 'DailyScrum/src/modules/cards/reducer';

export default class extends Component {
  props: PropsType;
  state: StateType = { isRefreshing: false };

  // Use FlatList / SectionList when 0.43 out

  // TODO filter by member
  // TODO identify unchecked checklists
  // TODO extract and show post estimated points
  // TODO show labels
  // TODO on click show attachments
  // TODO on click show description

  handleRefresh = () => {
    this.setState({ isRefreshing: true }, () => {
      this.props.onRefresh().then(() => this.setState({ isRefreshing: false }));
    });
  };

  render() {
    const { cards } = this.props;

    return (
      <ScrollView
        contentContainerStyle={this.props.style}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.handleRefresh} />}
      >
        {cards && cards.map(card => <View key={card.idShort}><TrelloCard card={card} /></View>)}
      </ScrollView>
    );
  }
}

type StateType = {
  isRefreshing: boolean,
};

type PropsType = {
  style?: any,
  cards: CardType[],
  onRefresh: Function,
};
