// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, RefreshControl, Text, TextInput } from 'react-native';
import { Page } from 'DailyScrum/src/components';
import { fetchBoards } from 'DailyScrum/src/modules/boards/sagas';
import { boardsListSelector } from '../../modules/boards/reducer';
import type { BoardType } from '../../types';
import BoardCard from './components/BoardCard';
import { changeCurrentRemoteProject } from '../../modules/projects';
import { currentProjectSelector } from '../../modules/projects/reducer';

class Settings extends Component {
  props: PropsType;
  state: StateType = { filterBoard: '', isRefreshing: false };

  handleRefresh = () => {
    this.setState({ isRefreshing: true }, () => {
      this.context.store.runSaga(fetchBoards).done.then(() => {
        this.setState({ isRefreshing: false });
      });
    });
  };

  // TODO Use FlatList / SectionList when 0.43 stable
  render() {
    const boards = this.props.boards.filter(board =>
      board.name.toLowerCase().includes(this.state.filterBoard.toLowerCase())
    );
    return (
      <Page>
        <TextInput
          style={styles.searchInput}
          onChangeText={filterBoard => this.setState({ filterBoard })}
          onSubmitEditing={() => boards.length > 0 && this.props.changeCurrentRemoteProject(boards[0])}
          value={this.state.filterBoard}
          autoCorrect={false}
          placeholder="Search a board"
          returnKeyType="go"
        />
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.handleRefresh} />}
        >
          {boards.length
            ? boards.map(board => (
                <BoardCard
                  key={board.id}
                  board={board}
                  isActive={board.id === this.props.currentBoardId}
                  onPress={() => this.props.changeCurrentRemoteProject(board)}
                />
              ))
            : <Text style={styles.noBoardsText}>No boards found</Text>}
        </ScrollView>
      </Page>
    );
  }
}

Settings.contextTypes = {
  store: React.PropTypes.any,
};

type PropsType = {
  navigation: any,
  boards: BoardType[],
  currentBoardId: ?string,
  changeCurrentRemoteProject: Function,
};

type StateType = {
  isRefreshing: boolean,
  filterBoard: string,
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    marginTop: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  noBoardsText: {
    textAlign: 'center',
  },
  scrollView: {
    paddingTop: 15,
  },
});

const mapStateToProps = state => {
  const currentProject = currentProjectSelector(state);
  return {
    boards: boardsListSelector(state),
    currentBoardId: currentProject ? currentProject.boardId : null,
  };
};

const mapDispatchToProps = {
  changeCurrentRemoteProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
