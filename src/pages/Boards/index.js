import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableOpacity } from 'react-native';
import { Page } from 'DailyScrum/src/components';
import appStyle from 'DailyScrum/src/appStyle';

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

  constructor () {
    super();

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
