// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, RefreshControl, ScrollView, Platform } from 'react-native';
import { Page, TrelloCard } from 'DailyScrum/src/components';
import { todayCardsSelector } from '../../modules/cards/reducer';
import { fetchNotDoneCards } from 'DailyScrum/src/modules/cards';
import { Trello } from 'DailyScrum/src/services';

import type { CardsType } from '../../modules/cards/reducer';

class Yesterday extends Component {
  props: PropsType;
  state: any = { refreshing: false };

  // TODO Use FlatList / SectionList when 0.43 out

  fetchCards = () => {
    //TODO loading redux store
    this.setState({ refreshing: true });
    this.props.fetchNotDoneCards();
    this.setState({refreshing: false });
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
  fetchNotDoneCards: Function,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  scrollView: {
    paddingVertical: Platform.OS === 'ios' ? 30 : 15,
  },
});

const mapStateToProps = state => ({
  cards: todayCardsSelector(state),
});

const mapDispatchToProps = {
  fetchNotDoneCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Yesterday);
