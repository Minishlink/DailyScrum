// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page, CardLists, createErrorBar } from 'DailyScrum/src/components';
import { yesterdayCardsSelector } from '../../modules/cards/reducer';
import { fetchDoneCards as fetchDoneCardsSaga } from 'DailyScrum/src/modules/cards/sagas';
import type { CardListsType } from 'DailyScrum/src/modules/cards/reducer';
const ErrorBar = createErrorBar({ cards: 'done' });

class Yesterday extends Component {
  props: PropsType;
  state: any = { refreshing: false };

  fetchCards = () => this.context.store.runSaga(fetchDoneCardsSaga).done;

  render() {
    return (
      <Page noNavBar>
        <ErrorBar />
        <CardLists onRefresh={this.fetchCards} cardLists={this.props.cardLists} />
      </Page>
    );
  }
}

Yesterday.contextTypes = {
  store: React.PropTypes.any,
};

type PropsType = {
  navigation: any,
  cardLists: CardListsType,
};

const mapStateToProps = state => ({
  cardLists: yesterdayCardsSelector(state),
});

export default connect(mapStateToProps)(Yesterday);
