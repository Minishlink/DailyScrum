// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page, CardLists } from 'DailyScrum/src/components';
import { todayCardsSelector } from '../../modules/cards/reducer';
import { fetchNotDoneCards as fetchNotDoneCardsSaga } from 'DailyScrum/src/modules/cards/sagas';
import type { CardListsType } from 'DailyScrum/src/modules/cards/reducer';

class Today extends Component {
  props: PropsType;
  state: any = { refreshing: false };

  fetchCards = () => this.context.store.runSaga(fetchNotDoneCardsSaga).done;

  render() {
    return (
      <Page noNavBar>
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
