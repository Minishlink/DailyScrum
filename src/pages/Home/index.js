import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';

import { Page, Button } from 'DailyScrum/src/components';
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
  instructions: {
    textAlign: 'center',
    color: appStyle.colors.darkGray,
    marginBottom: appStyle.grid.x1,
  },
});

type PropsType = {
  navigation: any,
};

class Home extends Component {
  static navigationOptions  = {
    title: 'Home',
  };
  props: PropsType;

  _goToInfos = () => {
    this.props.navigation.navigate('infos');
  };

  authTrello = () => {
    const url = "https://trello.com/1/authorize?" +
      "key=579da415101ddf46d6adfe71920c95ec&" +
      "expiration=never&" +
      "name=Daily%20Scrum&" +
      "return_url=dailyscrum://login";

    Linking.openURL(url);
  };

  render() {
    console.log(this.props.navigation.state.params);

    return (
      <Page>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            This is page the home
          </Text>
          <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            Shake or press menu button for dev menu
          </Text>
          <Button onPress={this.authTrello}>Authorize</Button>
        </View>
      </Page>
    );
  }
}

export default Home;
