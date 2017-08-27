// @flow
import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import Text from './Text';
import appStyle from '../appStyle';
import LottieAnimation from './LottieAnimation';

export default class NoProjectFound extends PureComponent {
  openURL = (url: string) => Linking.canOpenURL(url).then(() => Linking.openURL(url)).catch(() => {});
  goToScrumble = () => this.openURL('https://app.scrumble.io');

  render() {
    return (
      <View style={styles.container}>
        <LottieAnimation source={require('../../assets/lottie/sun_sad.json')} style={styles.image} />
        <Text style={styles.text}>Looks like you don't have any project yet, or it is not configured.</Text>
        <TouchableOpacity onPress={this.goToScrumble}>
          <Text style={[styles.text, styles.link]}>Create one on Scrumble!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '40%',
  },
  text: {
    marginTop: 10,
    fontSize: appStyle.font.size.big,
    textAlign: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
});
