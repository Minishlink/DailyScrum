// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page, CardLists, createErrorBar } from 'DailyScrum/src/components';
import { todayCardsSelector } from '../../modules/cards/reducer';
import { fetchNotDoneCards } from 'DailyScrum/src/modules/cards';
import type { CardListsType } from 'DailyScrum/src/modules/cards/reducer';
import { isSyncingSelector } from '../../modules/sync';
const ErrorBar = createErrorBar({ cards: 'notDone' });

class Today extends Component {
  props: PropsType;

  static navigationOptions = {
    headerTitle: 'Today',
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
  cardLists: todayCardsSelector(state),
  isSyncing: isSyncingSelector(state, 'cards', 'notDone'),
});

const mapDispatchToProps = {
  fetchCards: fetchNotDoneCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Today);
