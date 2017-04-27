// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Platform } from 'react-native';
import { Page, CardsList } from 'DailyScrum/src/components';
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
        <View style={styles.container}>
          <CardsList style={styles.list} onRefresh={this.fetchCards} cardLists={this.props.cardLists} />
        </View>
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
  cardLists: todayCardsSelector(state),
});

export default connect(mapStateToProps)(Today);
