// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page, CardLists, createErrorBar } from 'DailyScrum/src/components';
import { todayCardsSelector } from '../../modules/cards/reducer';
import { fetchNotDoneCards as fetchNotDoneCardsSaga } from 'DailyScrum/src/modules/cards/sagas';
import type { CardListsType } from 'DailyScrum/src/modules/cards/reducer';
const ErrorBar = createErrorBar({ cards: 'notDone' });

class Today extends Component {
  props: PropsType;
  state: any = { refreshing: false };

  fetchCards = () => this.context.store.runSaga(fetchNotDoneCardsSaga).done;

  render() {
    return (
      <Page noNavBar>
        <ErrorBar />
        <CardLists onRefresh={this.fetchCards} cardLists={this.props.cardLists} />
      </Page>
    );
  }
}

Today.contextTypes = {
  store: React.PropTypes.any,
};

type PropsType = {
  navigation: any,
  cardLists: CardListsType,
};

const mapStateToProps = state => ({
  cardLists: todayCardsSelector(state),
});

export default connect(mapStateToProps)(Today);
