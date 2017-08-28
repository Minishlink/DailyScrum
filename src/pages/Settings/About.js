// @flow
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Linking, Platform } from 'react-native';
import codePush from 'react-native-code-push';
import LottieAnimation from 'easy-lottie-react-native';
import { Page, Text } from 'DailyScrum/src/components';
import appStyle from '../../appStyle';
import { ENV } from '../../../environment';

const storeName =
  ENV === 'staging'
    ? 'HockeyApp'
    : Platform.select({
        ios: 'AppStore',
        android: 'Play Store',
      });

export default class About extends Component {
  state: StateType = {
    codePushInfo: null,
    codePushUpdateStatus: null,
    codePushMismatch: false,
  };

  static navigationOptions = {
    headerTitle: 'About',
  };

  componentDidMount() {
    codePush.getUpdateMetadata().then(update => {
      if (!update) return;
      let codePushInfo = update.label;
      if (update.description) {
        codePushInfo += ' (' + update.description + ')';
      }
      this.setState({
        codePushInfo,
      });
    });
  }

  updateWithCodePush = () => {
    codePush.sync(
      {
        updateDialog: {
          appendReleaseDescription: true,
          descriptionPrefix: '\n\nChangelog:\n',
        },
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      SyncStatus => {
        switch (SyncStatus) {
          case codePush.SyncStatus.CHECKING_FOR_UPDATE:
            this.setState({ codePushUpdateStatus: 'Checking for update' });
            break;
          case codePush.SyncStatus.AWAITING_USER_ACTION:
            this.setState({ codePushUpdateStatus: 'Await action' });
            break;
          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({ codePushUpdateStatus: 'Downloading' });
            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({ codePushUpdateStatus: 'Installing' });
            break;
          default:
            this.setState({ codePushUpdateStatus: 'No update found' });
        }
      },
      null,
      mismatch => mismatch && this.setState({ codePushMismatch: true })
    );
  };

  openURL = (url: string) => Linking.canOpenURL(url).then(() => Linking.openURL(url)).catch(() => {});
  sendAnEmail = () => this.openURL('mailto:louisl@bam.tech');
  goToGitHub = () => this.openURL('https://github.com/Minishlink/DailyScrum');

  render() {
    return (
      <Page noMargin>
        <View style={styles.container}>
          <View>
            <LottieAnimation
              source={require('../../../assets/lottie/bam.json')}
              style={styles.bamLogo}
              duration={600}
            />
          </View>
          <View style={styles.feedbackContainer}>
            <Text>Feedback is welcome !</Text>
            <TouchableOpacity onPress={this.sendAnEmail}>
              <Text style={styles.link}>louisl@bam.tech</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.goToGitHub}>
              <Text style={styles.link}>github.com/Minishlink/DailyScrum</Text>
            </TouchableOpacity>
          </View>
          <View>
            {this.state.codePushInfo &&
              <Text style={[styles.text, styles.codePushInfo]}>
                {this.state.codePushInfo}
              </Text>}
            {this.state.codePushMismatch
              ? <Text style={styles.text}>
                  There is a new version available on the {storeName}.
                </Text>
              : <TouchableOpacity onPress={this.updateWithCodePush}>
                  <Text style={styles.text}>
                    {this.state.codePushUpdateStatus || 'Check if there is an update'}
                  </Text>
                </TouchableOpacity>}
          </View>
        </View>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
  },
  bamLogo: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
  codePushInfo: {
    fontSize: appStyle.font.size.small,
  },
  feedbackContainer: {
    alignItems: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
});

type StateType = {
  codePushInfo: ?string,
  codePushUpdateStatus: ?string,
  codePushMismatch: boolean,
};
