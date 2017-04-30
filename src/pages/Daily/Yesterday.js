// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Platform } from 'react-native';
import { Page, CardLists } from 'DailyScrum/src/components';
import { yesterdayCardsSelector } from '../../modules/cards/reducer';
import { fetchDoneCards as fetchDoneCardsSaga } from 'DailyScrum/src/modules/cards/sagas';
import type { CardListsType } from 'DailyScrum/src/modules/cards/reducer';

class Yesterday extends Component {
  props: PropsType;
  state: any = { refreshing: false };

  fetchCards = () => this.context.store.runSaga(fetchDoneCardsSaga).done;

  render() {
    return (
      <Page noNavBar>
        <View style={styles.container}>
          <CardLists onRefresh={this.fetchCards} cardLists={this.props.cardLists} />
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
  cardLists: CardListsType,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 30 : 15, // header
  },
});

const mapStateToProps = state => ({
  cardLists: yesterdayCardsSelector(state),
});

export default connect(mapStateToProps)(Yesterday);
