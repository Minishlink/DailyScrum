// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button, Linking } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Page, LottieAnimation } from 'DailyScrum/src/components';
import appStyle from 'DailyScrum/src/appStyle';
import { Trello } from 'DailyScrum/src/services';
import { login, redirectAfterLogin } from 'DailyScrum/src/modules/auth';
import { isLoggedInSelector } from 'DailyScrum/src/modules/auth/reducer';

class Login extends Component {
  props: PropsType;

  componentDidMount() {
    // check if tokens exist in store
    if (this.props.isLoggedIn) {
      this.props.redirectAfterLogin();
      return;
    }

    SplashScreen.hide();

    // if not we login Scrumble if we have the trello Token
    if (!this.props.navigation.state.params) return;
    const trelloToken = this.props.navigation.state.params.token;
    this.props.login(trelloToken);
  }

  triggerLogin = () => Linking.openURL(Trello.getLoginURL());

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

type PropsType = {
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
