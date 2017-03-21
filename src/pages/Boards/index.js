import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableOpacity } from 'react-native';
import { Page } from 'DailyScrum/src/components';
import appStyle from 'DailyScrum/src/appStyle';
import Scrumble from 'DailyScrum/src/services/Scrumble';
import Trello from 'DailyScrum/src/services/Trello';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: appStyle.font.size.huge,
    textAlign: 'center',
    margin: appStyle.grid.x1,
  },
});

type PropsType = {
  navigation: any,
};

export default class Boards extends Component {
  props: PropsType;

  static navigationOptions  = {
    title: 'Boards',
  };

  constructor (props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      boards: [{
        name: 'Enercity',
        color: 'red',
      }, {
        name: 'VVMT',
        color: 'blue',
      }],
      user: {}
    };
  }

  componentDidMount () {
    if (!this.props.navigation.state.params) return;
    const trelloToken = this.props.navigation.state.params.token;

    // get my projects
    Scrumble.login(trelloToken).then(scrumbleToken => {
      // store tokens
      console.log(trelloToken);
      console.log(scrumbleToken);

      // TODO get projects from scrumble
      Trello.getUser(trelloToken).then(user => {
        this.setState({
          boards: user.boards,
          user: {
            id: user.id,
            name: user.fullName,
          },
        });
      });

      Scrumble.getCurrentProject(scrumbleToken).then(currentProject => {
        console.log(currentProject);
        this.setState({
          currentProject,
        });
      });

      Scrumble.getCurrentSprint(scrumbleToken).then(currentSprint => {
        console.log(currentSprint);
        this.setState({
          currentSprint,
        });
      });
    });
  }

  onPressBoard = board => {
    this.props.navigation.navigate('board', {board});
  };

  renderBoard = board => (
    <TouchableOpacity onPress={() => this.onPressBoard(board)}>
      <Text>{board.name}</Text>
    </TouchableOpacity>
  );

  render() {
    this.ds = this.ds.cloneWithRows(this.state.boards);

    return (
      <Page>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            { this.state.user ? `Hello ${this.state.user.name}!` : 'Loading...' }
          </Text>
          { this.state.currentProject && <Text>Current project is: {this.state.currentProject.name}</Text> }
          { this.state.currentSprint && <Text>Current sprint is: #{this.state.currentSprint.number} {this.state.currentSprint.goal}</Text> }
          <ListView
            dataSource={this.ds}
            renderRow={board => this.renderBoard(board)}
          />
        </View>
      </Page>
    );
  }
}
