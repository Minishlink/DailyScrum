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

export default class Board extends Component {
  constructor (props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      lists: [{
        name: 'Doing',
      }, {
        name: 'Done',
      }],
      cards: [{
        list: 'Doing',
        title: 'AAU, I can signup',
      }]
    };
  }

  static navigationOptions = {
    title: (navigation) => {
      console.log(navigation.state.params);
      return navigation.state.params.board.name;
    }
  };
  props: PropsType;

  componentDidMount () {
    if (!this.props.navigation.state.params) return;
    const { token } = this.props.navigation.state.params;

    // TODO get my cards
    fetch(`https://api.trello.com/1/members/me?fields=fullName&boards=all&board_fields=name&key=579da415101ddf46d6adfe71920c95ec&token=${token}`)
    .then(res => res.json())
    .then(user => {
      fetch('https://api.scrumble.io/v1/Sprints/active', {
        Authorization: user.key,
      });
      console.log(user);
      this.setState({
        boards: user.boards,
        user: {
          id: user.id,
          name: user.fullName,
        },
      });
    });
  }

  onPressCard = card => {
    console.log(card);
  };

  renderCard = card => (
    <TouchableOpacity onPress={() => this.onPressCard(card)}>
      <Text>{card.title} in {card.list}</Text>
    </TouchableOpacity>
  );

  render() {
    this.ds = this.ds.cloneWithRows(this.state.cards);

    return (
      <Page>
        <View style={styles.container}>
          <ListView
            dataSource={this.ds}
            renderRow={card => this.renderCard(card)}
          />
        </View>
      </Page>
    );
  }
}
