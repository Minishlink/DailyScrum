// @flow
import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, Linking, Button } from 'react-native';
import { Page } from 'DailyScrum/src/components';
import appStyle from 'DailyScrum/src/appStyle';
import Scrumble from 'DailyScrum/src/services/Scrumble';
import Trello from 'DailyScrum/src/services/Trello';
import { login } from 'DailyScrum/src/modules/auth';
import { authSelector } from 'DailyScrum/src/modules/auth/reducer';
import { AuthType } from "../../modules/auth/reducer";


const mapStateToProps = state => ({
  auth: authSelector(state),
});

const mapDispatchToProps = {
  login,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
  props: PropsType;

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // check if tokens exist in store

    // if not
    if (!this.props.navigation.state.params) return;
    const trelloToken = this.props.navigation.state.params.token;

    // get my projects
    Scrumble.login(trelloToken).then(scrumbleToken => {
      // store tokens
      this.props.login({trelloToken, scrumbleToken});

      // TODO get projects from scrumble
      Trello.getUser(trelloToken).then(user => {
        this.setState({
          boards: user.boards,
          user: {
            id: user.id,
            name: user.fullName,
          },
        });
      });

      Scrumble.getCurrentProject(scrumbleToken).then(currentProject => {
        console.log(currentProject);
        this.setState({
          currentProject,
        });
      });

      Scrumble.getCurrentSprint(scrumbleToken).then(currentSprint => {
        console.log(currentSprint);
        this.setState({
          currentSprint,
        });
      });
    });
  }

  authTrello = () => {
    Linking.openURL(Trello.getLoginURL());
  };

  isLoggingIn = () => this.props.navigation.state.params && this.props.navigation.state.params.token;

  renderLoggedOut = () => (
    <View>
      <Text style={styles.welcome}>
        {this.isLoggingIn() ? 'Logging in...' : 'Please login on Trello first. :)'}
      </Text>
      <Button onPress={this.authTrello} disabled={this.props.auth.isLoggedIn} title="Authorize" />
    </View>
  );

  renderLoggedIn = () => (
    <View>
      <Text style={styles.welcome}>
        { this.state.user ? `Hello ${this.state.user.name}!` : 'Loading...' }
      </Text>
    </View>
  );

  render() {
    return (
      <Page>
        <View style={styles.container}>
          { this.props.auth.isLoggedIn ? this.renderLoggedIn() : this.renderLoggedOut() }
        </View>
      </Page>
    );
  }
}

type PropsType = {
  auth: AuthType,
};

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