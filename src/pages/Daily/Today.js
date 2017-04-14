// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Platform } from 'react-native';
import { Page, CardsList } from 'DailyScrum/src/components';
import { todayCardsSelector } from '../../modules/cards/reducer';
import { fetchNotDoneCards as fetchNotDoneCardsSaga } from 'DailyScrum/src/modules/cards/sagas';
import { Trello } from 'DailyScrum/src/services';
import type { CardType } from '../../modules/cards/reducer';

class Today extends Component {
  props: PropsType;
  state: any = { refreshing: false };

  fetchCards = () => this.context.store.runSaga(fetchNotDoneCardsSaga).done;

  render() {
    const { cards } = this.props;
    return (
      <Page noNavBar>
        <View style={styles.container}>
          <CardsList style={styles.list} onRefresh={this.fetchCards} cards={cards} />
        </View>
      </Page>
    );
  }
}

Today.contextTypes = {
  store: React.PropTypes.any
};

type PropsType = {
  navigation: any,
  cards: CardType[],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  list: {
    paddingVertical: Platform.OS === 'ios' ? 30 : 15,
  },
});

const mapStateToProps = state => ({
  cards: todayCardsSelector(state),
});

export default connect(mapStateToProps)(Today);
