// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Button, Linking, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import SafariView from 'react-native-safari-view';
import LottieAnimation from 'easy-lottie-react-native';
import { Page, Text } from '../../components';
import appStyle from '../../appStyle';
import { Trello, Analytics } from '../../services';
import { redirectAfterLogin } from '../../modules/navigation';
import { login } from '../../modules/auth';
import { isLoggedInSelector } from '../../modules/auth/reducer';

class Login extends Component<Props> {
  componentDidMount() {
    // check if tokens exist in store
    if (this.props.isLoggedIn) {
      this.props.redirectAfterLogin();
      return;
    }

    SplashScreen.hide();

    // if not we login Scrumble if we have the trello Token
    if (!this.props.navigation.state.params) return;
    Platform.OS === 'ios' && SafariView.dismiss();

    // the user logged in through Trello
    Analytics.logEvent('login_trello_ok'); // are users unwilling to authorize Trello access?
    const trelloToken = this.props.navigation.state.params.token;
    this.props.login(trelloToken); // let's log the user in Scrumble
  }

  triggerLogin = () => {
    Analytics.logEvent('login_trello_trigger'); // are users unwilling to login with Trello?
    const loginUrl = Trello.getLoginURL();
    if (Platform.OS === 'ios') {
      SafariView.isAvailable()
        .then(() =>
          SafariView.show({
            url: loginUrl,
          })
        )
        .catch(() => Linking.openURL(loginUrl));
    } else {
      Linking.openURL(loginUrl);
    }
  };

  render() {
    if (this.props.isLoggedIn || this.props.navigation.state.params) {
      return <Page isLoading />;
    }

    return (
      <Page>
        <View style={styles.container}>
          <LottieAnimation source={require('../../../assets/lottie/sun_happy.json')} style={styles.logo} loop />
          <Text style={styles.title}>DailyScrum</Text>
          <Text style={styles.description}>Your mobile daily dose of Scrum</Text>
          <Button onPress={this.triggerLogin} title="Login with Trello" />
        </View>
      </Page>
    );
  }
}

type Props = {
  navigation: any,
  login: Function,
  redirectAfterLogin: Function,
  isLoggedIn: boolean,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: '30%',
  },
  title: {
    marginTop: 10,
    fontSize: appStyle.font.size.big,
  },
  description: {
    marginBottom: 40,
  },
});

const mapStateToProps = state => ({
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  login,
  redirectAfterLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
