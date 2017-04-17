// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Platform } from 'react-native';
import { Page, CardsList } from 'DailyScrum/src/components';
import { yesterdayCardsSelector } from '../../modules/cards/reducer';
import { fetchDoneCards as fetchDoneCardsSaga } from 'DailyScrum/src/modules/cards/sagas';
import type { CardType } from '../../types';

class Yesterday extends Component {
  props: PropsType;
  state: any = { refreshing: false };

  fetchCards = () => this.context.store.runSaga(fetchDoneCardsSaga).done;

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

Yesterday.contextTypes = {
  store: React.PropTypes.any,
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
  cards: yesterdayCardsSelector(state),
});

export default connect(mapStateToProps)(Yesterday);
