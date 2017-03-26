// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button, Linking, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Page } from 'DailyScrum/src/components';
import appStyle from 'DailyScrum/src/appStyle';
import { Trello, Scrumble } from 'DailyScrum/src/services';
import { login } from 'DailyScrum/src/modules/auth';
import { authSelector } from 'DailyScrum/src/modules/auth/reducer';
import type { AuthType } from '../../modules/auth/reducer';

class Login extends Component {
  props: PropsType;

  componentDidMount() {
    // check if tokens exist in store
    if (this.props.isLoggedIn) {
      this.redirect();
      return;
    }

    // if not we login Scrumble if we have the trello Token
    if (!this.props.navigation.state.params) return;
    const trelloToken = this.props.navigation.state.params.token;
    Scrumble.login(trelloToken).then(scrumbleToken => {
      // store tokens
      this.props.login({ trelloToken, scrumbleToken });
      this.redirect();
    });
  }

  redirect = () => {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'main' })],
      })
    );
  };

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

type PropsType = AuthType & {
  navigation: any,
  login: Function,
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
  ...authSelector(state),
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
