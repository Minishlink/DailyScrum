// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page, CardLists, createErrorBar } from 'DailyScrum/src/components';
import { yesterdayCardsSelector } from '../../modules/cards/reducer';
import { fetchDoneCards } from 'DailyScrum/src/modules/cards';
import type { CardListsType } from 'DailyScrum/src/modules/cards/reducer';
import { isSyncingSelector } from '../../modules/sync';
const ErrorBar = createErrorBar({ cards: 'done' });

class Yesterday extends Component {
  props: PropsType;

  static navigationOptions = {
    headerTitle: 'Yesterday',
  };

  render() {
    return (
      <Page noNavBar>
        <ErrorBar />
        <CardLists
          onRefresh={this.props.fetchCards}
          isRefreshing={this.props.isSyncing}
          cardLists={this.props.cardLists}
        />
      </Page>
    );
  }
}

type PropsType = {
  navigation: any,
  cardLists: CardListsType,
  isSyncing: boolean,
  fetchCards: Function,
};

const mapStateToProps = state => ({
  cardLists: yesterdayCardsSelector(state),
  isSyncing: isSyncingSelector(state, 'cards', 'done'),
});

const mapDispatchToProps = {
  fetchCards: fetchDoneCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Yesterday);
