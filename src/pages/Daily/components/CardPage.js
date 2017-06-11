// @flow
import React, { Component } from 'react';
import { Page, CardLists, createErrorBar } from 'DailyScrum/src/components';
import type { CardListsType } from 'DailyScrum/src/modules/cards/reducer';
import type { ErrorBarOptionsType } from '../../../components/ErrorBar';

export default (title: string, errorBarOptions: ErrorBarOptionsType) => {
  const ErrorBar = createErrorBar(errorBarOptions);
  return class extends Component {
    props: PropsType;

    static navigationOptions = {
      headerTitle: title,
    };

    render() {
      return (
        <Page noNavBar>
          <ErrorBar />
          <CardLists
            onRefresh={this.props.fetchCards}
            isRefreshing={this.props.isSyncing}
            cardLists={this.props.cardLists}
            filteredMember={this.props.filteredMember}
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
};
