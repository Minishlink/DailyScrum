// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, Text, TextInput } from 'react-native';
import { Page, createErrorBar } from 'DailyScrum/src/components';
import { fetchBoards } from 'DailyScrum/src/modules/boards';
import { boardsListSelector } from '../../modules/boards/reducer';
import type { BoardType } from '../../types';
import BoardCard from './components/BoardCard';
import { changeCurrentRemoteProject } from '../../modules/projects';
import { currentProjectSelector } from '../../modules/projects/reducer';
import { isSyncingSelector } from '../../modules/sync';
import InfoButton from './components/InfoButton';
const ErrorBar = createErrorBar({ boards: 'all', projects: 'change' });

class Settings extends Component {
  props: PropsType;
  state: StateType = { filterBoard: '', lastSelectedBoard: '' };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Change project',
    headerRight: <InfoButton navigation={navigation} />,
  });

  handleRefresh = () => {
    this.props.fetchBoards();
  };

  changeProject = (board: BoardType) => {
    this.setState({ lastSelectedBoard: board.id });
    this.props.changeCurrentRemoteProject(board);
  };

  renderBoard = ({ item: board }) =>
    <BoardCard
      board={board}
      isActive={board.id === this.props.currentBoardId}
      isLoading={this.props.isChangingProject && board.id === this.state.lastSelectedBoard}
      onPress={() => this.changeProject(board)}
    />;

  renderEmpty = () => <Text style={styles.noBoardsText}>No boards found</Text>;

  render() {
    const boards = this.props.boards.filter(board =>
      board.name.toLowerCase().includes(this.state.filterBoard.toLowerCase())
    );
    return (
      <Page>
        <ErrorBar />
        <TextInput
          style={styles.searchInput}
          onChangeText={filterBoard => this.setState({ filterBoard })}
          onSubmitEditing={() => boards.length > 0 && this.changeProject(boards[0])}
          value={this.state.filterBoard}
          editable={!this.props.isChangingProject && !this.props.isSyncingBoards}
          autoCorrect={false}
          placeholder="Search a board"
          returnKeyType="go"
        />
        <FlatList
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          data={boards}
          renderItem={this.renderBoard}
          keyExtractor={board => board.id}
          refreshing={this.props.isSyncingBoards}
          onRefresh={this.handleRefresh}
          ListEmptyComponent={this.renderEmpty}
          keyboardShouldPersistTaps="handled"
        />
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
  fetchBoards: Function,
  isSyncingBoards: boolean,
  isChangingProject: boolean,
};

type StateType = {
  filterBoard: string,
  lastSelectedBoard: string,
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    marginTop: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  noBoardsText: {
    textAlign: 'center',
  },
  scrollView: {
    paddingVertical: 15,
  },
});

const mapStateToProps = state => {
  const currentProject = currentProjectSelector(state);
  return {
    boards: boardsListSelector(state),
    currentBoardId: currentProject ? currentProject.boardId : null,
    isSyncingBoards: isSyncingSelector(state, 'boards', 'all'),
    isChangingProject: isSyncingSelector(state, 'projects', 'change'),
  };
};

const mapDispatchToProps = {
  changeCurrentRemoteProject,
  fetchBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
