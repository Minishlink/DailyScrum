// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Button, Linking, Platform, Dimensions } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import SafariView from 'react-native-safari-view';
import LottieAnimation from 'easy-lottie-react-native';
import { Page, Text } from '../../components';
import appStyle from '../../appStyle';
import { Trello, Analytics } from '../../services';
import { login } from '../../modules/auth';
import { isLoggedInSelector } from '../../modules/auth/reducer';
import Navigation from '../../services/Navigation';

class Login extends Component<Props> {
  componentDidMount() {
    // check if tokens exist in store
    if (this.props.isLoggedIn) {
      Navigation.redirectAfterLogin();
      return;
    }

    SplashScreen.hide();

    // if not we login Scrumble if we have the trello Token
    const trelloToken = this.props.navigation.state.params && this.props.navigation.state.params.token;
    if (!trelloToken) return;
    this.login(trelloToken);
  }

  componentWillReceiveProps(nextProps: Props) {
    const currentTrelloToken = this.props.navigation.state.params && this.props.navigation.state.params.token;
    const nextTrelloToken = nextProps.navigation.state.params && nextProps.navigation.state.params.token;

    if (!currentTrelloToken && nextTrelloToken) {
      this.login(nextTrelloToken);
    }
  }

  login = (token: string) => {
    Platform.OS === 'ios' && SafariView.dismiss();
    Analytics.logEvent('login_trello_ok'); // are users unwilling to authorize Trello access?
    this.props.login(token); // let's log the user in Scrumble
  };

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
    } else if (Platform.OS === 'web') {
      window.location.assign(loginUrl);
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
  isLoggedIn: boolean,
};

const dimensions = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: dimensions.width >= dimensions.height ? dimensions.width * 0.3 : undefined,
    height: dimensions.height > dimensions.width ? dimensions.height * 0.3 : undefined,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
