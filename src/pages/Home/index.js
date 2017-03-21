import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking, Button } from 'react-native';
import { Page } from 'DailyScrum/src/components';
import appStyle from 'DailyScrum/src/appStyle';
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

export default class Home extends Component {
  authTrello = () => {
    Linking.openURL(Trello.getLoginURL());
  };

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Please login on Trello first. :)
          </Text>
          <Button onPress={this.authTrello} title="Authorize" />
        </View>
      </Page>
    );
  }
}
