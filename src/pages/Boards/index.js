import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
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
  constructor (props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      boards: [],
      user: {}
    };
  }

  static navigationOptions  = {
    title: 'Boards',
  };
  props: PropsType;

  componentDidMount () {
    const { token } = this.props.navigation.state.params;
    if (!token) return;

    // get my boards
    fetch(`https://api.trello.com/1/members/me?fields=fullName&boards=all&board_fields=name&key=579da415101ddf46d6adfe71920c95ec&token=${token}`)
    .then(res => res.json())
    .then(user => {
      this.setState({
        boards: user.boards,
        user: {
          id: user.id,
          name: user.fullName,
        },
      });
    });
  }

  render() {
    this.ds = this.ds.cloneWithRows(this.state.boards);

    return (
      <Page>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            { this.state.user ? `Hello ${this.state.user.name}!` : 'Loading...' }
          </Text>
          <ListView
            dataSource={this.ds}
            renderRow={board => <Text>{board.name}</Text>}
          />
        </View>
      </Page>
    );
  }
 }
