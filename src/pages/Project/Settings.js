// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import { Page, Icon } from 'DailyScrum/src/components';
import { fetchBoards } from 'DailyScrum/src/modules/boards/sagas';
import { boardsListSelector } from '../../modules/boards/reducer';
import type { BoardsType } from '../../modules/boards/reducer';
import type { BoardType } from '../../types';

class Settings extends Component {
  props: PropsType;
  state: StateType = { isRefreshing: false };

  handleRefresh = () => {
    this.setState({ isRefreshing: true }, () => {
      this.context.store.runSaga(fetchBoards).done.then(() => {
        this.setState({ isRefreshing: false });
      });
    });
  };

  renderBoard = (board: BoardType) => {
    return <Text>{board.name}</Text>
  };

  render() {
    const { boards } = this.props;
    return (
      <Page style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.handleRefresh} />}
        >
          {boards.map(board => <View key={board.id}>{this.renderBoard(board)}</View>)}
        </ScrollView>
      </Page>
    );
  }
}

Settings.contextTypes = {
  store: React.PropTypes.any
};

type PropsType = {
  navigation: any,
  boards: BoardsType,
};

type StateType = {
  isRefreshing: boolean,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  boards: boardsListSelector(state),
});

export default connect(mapStateToProps)(Settings);
