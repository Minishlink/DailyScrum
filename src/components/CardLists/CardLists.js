// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions } from 'react-native';
import SectionList from 'SectionList';
import * as Animatable from 'react-native-animatable';
import LottieAnimation from 'easy-lottie-react-native';
import { TrelloCard, Text } from '../../components';
import type { CardListsType, CardListType } from '../../modules/cards/reducer';
import type { CardType } from '../../types';
import { ListHeader } from './';
import { getTipIfNotReadSelector } from '../../modules/tips/reducer';
import type { TipType } from '../../modules/tips/reducer';
import TipCard from '../TipCard';
import appStyle from '../../appStyle';

class CardsList extends PureComponent<Props> {
  renderCard = ({ item }: { item: CardType }) => <TrelloCard style={styles.card} card={item} />;
  renderSectionHeader = ({ section }: { section: any }) =>
    section.data.length ? <ListHeader listKey={section.key} total={section.points} /> : null;

  renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text>No cards yet</Text>
      <Text>Pull to refresh :)</Text>
      <LottieAnimation source={require('../../../assets/lottie/empty_status.json')} loop duration={6000} />
    </View>
  );

  renderHeader = () => {
    const { FilterMembersComponent } = this.props;
    return (
      <View>
        {!!FilterMembersComponent && <FilterMembersComponent />}
        {this.renderTip()}
      </View>
    );
  };

  renderTip = () =>
    this.props.tip && (
      <View style={styles.tipContainer}>
        <TipCard tip={this.props.tip} />
      </View>
    );

  renderSeperator = () => <View style={styles.listSeparator} />;

  keyExtractor = (card: CardType) => card.idShort;

  render() {
    const { cardLists } = this.props;
    // $FlowFixMe https://github.com/facebook/flow/issues/2221
    const sections = Object.entries(cardLists) // $FlowFixMe https://github.com/facebook/flow/issues/2221
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
        <Animatable.View animation="fadeIn" style={{ flex: 1 }} useNativeDriver>
          <SectionList
            contentContainerStyle={styles.listsContainer}
            showsVerticalScrollIndicator={false}
            refreshing={this.props.isRefreshing}
            onRefresh={this.props.onRefresh}
            SectionSeparatorComponent={this.renderSeperator}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderCard}
            ListHeaderComponent={sections.length > 0 ? this.renderHeader : null}
            ListEmptyComponent={this.renderEmpty}
            keyExtractor={this.keyExtractor}
            sections={sections}
            onScroll={this.props.onScroll}
          />
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  emptyContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  listsContainer: {
    paddingTop: 10,
    paddingBottom: 100,
    minHeight: Dimensions.get('window').height + 110,
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
  card: {
    marginVertical: appStyle.margin / 2,
  },
});

type Props = {
  style?: any,
  cardLists: CardListsType,
  filteredMember: ?string,
  onRefresh: Function,
  isRefreshing: boolean,
  onScroll: Function,
  tip: ?TipType,
  FilterMembersComponent?: any,
};

const mapStateToProps = state => ({
  tip: getTipIfNotReadSelector(state, 'CARDLISTS_OPEN_TRELLO'),
});

export default connect(mapStateToProps)(CardsList);
