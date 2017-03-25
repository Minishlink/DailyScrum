import React from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';
import { Trello } from 'DailyScrum/src/services';
import appStyle from 'DailyScrum/src/appStyle';

export default (props) => (
  <View>
    <Text style={styles.welcome}>Please login on Trello first. :)</Text>
    <Button onPress={() => Linking.openURL(Trello.getLoginURL())} title="Authorize" />
  </View>
);

const styles = StyleSheet.create({
  welcome: {
    fontSize: appStyle.font.size.huge,
    textAlign: 'center',
  },
});
