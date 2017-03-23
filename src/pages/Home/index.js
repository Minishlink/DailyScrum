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
import type { AuthType } from "../../modules/auth/reducer";

class Home extends Component {
  props: PropsType;
  state: any;

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // check if tokens exist in store
    if (this.props.isLoggedIn) {
      this.fetchHomeData();
      return;
    }

    // if not we login Scrumble if we have the trello Token
    if (!this.props.navigation.state.params) return;
    const trelloToken = this.props.navigation.state.params.token;
    Scrumble.login(trelloToken).then(scrumbleToken => {
      // store tokens
      this.props.login({trelloToken, scrumbleToken});
      this.fetchHomeData();
    });
  }

  authTrello = () => {
    Linking.openURL(Trello.getLoginURL());
  };

  fetchHomeData = () => {
    const { token } = this.props;

    // get my projects
    // TODO get projects from scrumble
    Trello.getUser(token.trello).then(user => {
      this.setState({
        boards: user.boards,
        user: {
          id: user.id,
          name: user.fullName,
        },
      });
    });

    Scrumble.getCurrentProject(token.scrumble).then(currentProject => {
      console.log(currentProject);
      this.setState({
        currentProject,
      });
    });

    Scrumble.getCurrentSprint(token.scrumble).then(currentSprint => {
      console.log(currentSprint);
      this.setState({
        currentSprint,
      });
    });
  };

  renderLoggedOut = () => {
    const loggingIn = this.props.navigation.state.params && this.props.navigation.state.params.token;
    return (
      <View>
        <Text style={styles.welcome}>
          {loggingIn ? 'Logging in...' : 'Please login on Trello first. :)'}
        </Text>
        <Button onPress={this.authTrello} disabled={loggingIn} title="Authorize" />
      </View>
    );
  };

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
          { this.props.isLoggedIn ? this.renderLoggedIn() : this.renderLoggedOut() }
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
    alignItems: 'center',
  },
  welcome: {
    fontSize: appStyle.font.size.huge,
    textAlign: 'center',
    margin: appStyle.grid.x1,
  },
});

const mapStateToProps = state => ({
  ...authSelector(state),
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);