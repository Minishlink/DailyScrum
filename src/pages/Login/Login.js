// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button, Linking } from 'react-native';
import { Page } from 'DailyScrum/src/components';
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

    // if not we login Scrumble if we have the trello Token
    if (!this.props.navigation.state.params) return;
    const trelloToken = this.props.navigation.state.params.token;
    this.props.login(trelloToken);
  }

  render() {
    if (this.props.isLoggedIn || this.props.navigation.state.params) {
      return <Page isLoading />;
    }

    return (
      <Page>
        <View style={styles.container}>
          <Text style={styles.welcome}>Please login on Trello first. :)</Text>
          <Button onPress={() => Linking.openURL(Trello.getLoginURL())} title="Authorize" />
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
  },
  welcome: {
    fontSize: appStyle.font.size.huge,
    textAlign: 'center',
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
