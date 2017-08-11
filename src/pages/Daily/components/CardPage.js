// @flow
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Page, CardLists } from 'DailyScrum/src/components';
import type { CardListsType } from 'DailyScrum/src/modules/cards/reducer';
import { makeFilterMembers } from '../../../components/CardLists';

export default (title: string, pageKey: 'today' | 'yesterday') => {
  const FilterMembers = makeFilterMembers(pageKey);
  return class extends Component {
    props: PropsType;

    static navigationOptions = {
      headerTitle: title,
    };

    render() {
      return (
        <Page noNavBar>
          <FilterMembers contentContainerStyle={styles.filterContentContainer} />
          <CardLists
            onRefresh={this.props.fetchCards}
            isRefreshing={this.props.isSyncing}
            cardLists={this.props.cardLists}
            filteredMember={this.props.filteredMember}
            onScroll={this.props.onScrollCards}
          />
        </Page>
      );
    }
  };
};

type PropsType = {
  navigation: any,
  cardLists: CardListsType,
  isSyncing: boolean,
  fetchCards: Function,
  filteredMember: ?string,
  onScrollCards: Function,
};

const styles = StyleSheet.create({
  filterContentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 10,
  },
});
