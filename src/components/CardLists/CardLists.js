// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, SectionList, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TrelloCard, LottieAnimation } from 'DailyScrum/src/components';
import type { CardListsType, CardListType } from 'DailyScrum/src/modules/cards/reducer';
import type { CardType } from '../../types';
import { ListHeader } from './';
import { getTipIfNotReadSelector } from '../../modules/tips/reducer';
import type { TipType } from '../../modules/tips/reducer';
import TipCard from '../TipCard';

class CardsList extends Component {
  props: PropsType;

  renderCard = ({ item }: { item: CardType }) => <TrelloCard card={item} />;
  renderSectionHeader = ({ section }: { section: any }) =>
    section.data.length ? <ListHeader listKey={section.key} total={section.points} /> : null;

  renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text>No cards yet</Text>
      <Text>Pull to refresh :)</Text>
      <LottieAnimation source={require('../../../assets/lottie/empty_status.json')} duration={6000} />
    </View>
  );

  renderTip = () => this.props.tip && <View style={styles.tipContainer}><TipCard tip={this.props.tip} /></View>;

  render() {
    const { cardLists } = this.props;
    // $FlowFixMe https://github.com/facebook/flow/issues/2221
    const sections = Object.entries(cardLists)
      .map(([columnKey, column]: [string, CardListType]) => ({
        key: columnKey,
        points: column.points,
        data: column.list.filter(
          card => (this.props.filteredMember ? card.idMembers.includes(this.props.filteredMember) : true)
        ),
      }))
      .filter(section => section.data.length > 0);

    return (
      <View style={[styles.container, this.props.style]}>
        <Animatable.View animation="fadeIn" style={{ flex: 1 }}>
          <SectionList
            contentContainerStyle={styles.listsContainer}
            showsVerticalScrollIndicator={false}
            refreshing={this.props.isRefreshing}
            onRefresh={this.props.onRefresh}
            SectionSeparatorComponent={() => <View style={styles.listSeparator} />}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderCard}
            ListHeaderComponent={this.renderTip}
            ListEmptyComponent={this.renderEmpty}
            keyExtractor={(card: CardType) => card.idShort}
            sections={sections}
          />
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  listsContainer: {
    paddingVertical: 10,
  },
  listName: {
    marginBottom: 5,
  },
  listSeparator: {
    marginTop: 20,
  },
  tipContainer: {
    marginVertical: 10,
  },
});

type PropsType = {
  style?: any,
  cardLists: CardListsType,
  filteredMember: ?string,
  onRefresh: Function,
  isRefreshing: boolean,
  tip: ?TipType,
};

const mapStateToProps = state => ({
  tip: getTipIfNotReadSelector(state, 'CARDLISTS_OPEN_TRELLO'),
});

export default connect(mapStateToProps)(CardsList);
