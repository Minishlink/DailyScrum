// @flow
import React, { Component } from 'react';
import { StyleSheet, View, SectionList, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TrelloCard } from 'DailyScrum/src/components';
import type { CardListsType, CardListType } from 'DailyScrum/src/modules/cards/reducer';
import type { CardType } from '../../types';
import { ListHeader } from './';

class CardsList extends Component {
  props: PropsType;

  renderCard = ({ item }: { item: CardType }) => <TrelloCard card={item} />;
  renderSectionHeader = ({ section }: { section: { data: [], key: string, points: number } }) =>
    section.data.length ? <ListHeader listKey={section.key} total={section.points} /> : null;

  renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text>No cards yet</Text>
      <Text>Pull to refresh :)</Text>
    </View>
  );

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
});

type PropsType = {
  style?: any,
  cardLists: CardListsType,
  filteredMember: ?string,
  onRefresh: Function,
  isRefreshing: boolean,
};

export default CardsList;
