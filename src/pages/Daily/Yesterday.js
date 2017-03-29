// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import { Page, TrelloCard } from 'DailyScrum/src/components';
import { yesterdayCardsSelector } from '../../modules/cards/reducer';
import { fetchDoneCards } from 'DailyScrum/src/modules/cards';
import { Trello } from 'DailyScrum/src/services';

import type { CardsType } from '../../modules/cards/reducer';

class Yesterday extends Component {
  props: PropsType;
  state: any = { refreshing: false };

  // points done
  // show cards in done
  // show cards in to be validated without identifying (should be in problems)
  // show cards in blocked without identifying (should be in problems)
  // show cards in doing without identifying (should be in problems)

  // Use FlatList / SectionList when 0.43 out

  // TODO filter by member
  // TODO identify unchecked checklists
  // TODO extract and show points
  // TODO extract and show estimated points
  // TODO show labels
  // TODO show ticket #shortId
  // TODO on click show attachments
  // TODO on click show description

  fetchCards = () => {
    //TODO loading redux store
    this.setState({ refreshing: true });
    this.props.fetchDoneCards();
    this.setState({refreshing: false,});
  };

  render() {
    const { cards } = this.props;
    if (!cards.length) return <Page isLoading />;

    return (
      <Page noNavBar>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.fetchCards} />}
          >
            {cards &&
              cards.map(card => (
                <View key={card.idShort}><TrelloCard title={card.name} members={card.members} /></View>
              ))}
          </ScrollView>
        </View>
      </Page>
    );
  }
}

type PropsType = {
  navigation: any,
  cards: CardsType,
  fetchDoneCards: Function,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  scrollView: {
    paddingVertical: 16,
  },
});

const mapStateToProps = state => ({
  cards: yesterdayCardsSelector(state),
});

const mapDispatchToProps = {
  fetchDoneCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Yesterday);
