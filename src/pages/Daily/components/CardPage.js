// @flow
import React, { Component } from 'react';
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
          <CardLists
            onRefresh={this.props.fetchCards}
            isRefreshing={this.props.isSyncing}
            cardLists={this.props.cardLists}
            filteredMember={this.props.filteredMember}
            onScroll={this.props.onScrollCards}
            FilterMembersComponent={FilterMembers}
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
