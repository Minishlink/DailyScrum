// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, RefreshControl, ScrollView, Platform } from 'react-native';
import { Page, TrelloCard } from 'DailyScrum/src/components';
import { todayCardsSelector } from '../../modules/cards/reducer';
import { fetchNotDoneCards as fetchNotDoneCardsSaga } from 'DailyScrum/src/modules/cards/sagas';
import { Trello } from 'DailyScrum/src/services';
import type { CardType } from '../../modules/cards/reducer';

class Today extends Component {
  props: PropsType;
  state: any = { refreshing: false };

  // TODO Use FlatList / SectionList when 0.43 out

  fetchCards = () => {
    this.setState({ refreshing: true }, () => {
      this.context.store.runSaga(fetchNotDoneCardsSaga).done.then(() => this.setState({refreshing: false }));
    });
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
              <View key={card.idShort}><TrelloCard card={card} /></View>
            ))}
          </ScrollView>
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
  scrollView: {
    paddingVertical: Platform.OS === 'ios' ? 30 : 15,
  },
});

const mapStateToProps = state => ({
  cards: todayCardsSelector(state),
});

export default connect(mapStateToProps)(Today);
