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
});

type PropsType = {
  navigation: any,
};

export default class Home extends Component {
  props: PropsType;

  authTrello = () => {
    const url = "https://trello.com/1/authorize?" +
      "key=579da415101ddf46d6adfe71920c95ec&" +
      "expiration=never&" +
      "name=Daily%20Scrum&" +
      "return_url=dailyscrum://login";

    Linking.openURL(url);
  };

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Please login on Trello first. :)
          </Text>
          <Button onPress={this.authTrello}>Authorize</Button>
        </View>
      </Page>
    );
  }
}
