// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, RefreshControl, Platform } from 'react-native';
import { Page, Icon } from 'DailyScrum/src/components';
import { fetchBoards } from 'DailyScrum/src/modules/boards/sagas';
import { boardsListSelector } from '../../modules/boards/reducer';
import type { BoardType } from '../../types';
import BoardCard from "./components/BoardCard";

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

  // TODO Use FlatList / SectionList when 0.43 stable
  render() {
    const { boards } = this.props;
    return (
      <Page noNavBar>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.handleRefresh} />}
        >
          {boards.map(board => <BoardCard key={board.id} board={board} onPress={() => console.log(board)} />)}
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
  boards: BoardType[],
};

type StateType = {
  isRefreshing: boolean,
};

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: Platform.OS === 'ios' ? 30 : 15,
  }
});

const mapStateToProps = state => ({
  boards: boardsListSelector(state),
});

export default connect(mapStateToProps)(Settings);
