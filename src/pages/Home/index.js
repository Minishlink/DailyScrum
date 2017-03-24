// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Linking, Button } from 'react-native';
import { Page } from 'DailyScrum/src/components';
import appStyle from 'DailyScrum/src/appStyle';
import Scrumble from 'DailyScrum/src/services/Scrumble';
import Trello from 'DailyScrum/src/services/Trello';
import { login } from 'DailyScrum/src/modules/auth';
import { authSelector } from 'DailyScrum/src/modules/auth/reducer';
import type { AuthType } from '../../modules/auth/reducer';
import { fetchCurrentSprint } from 'DailyScrum/src/modules/sprints';

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
      this.props.login({ trelloToken, scrumbleToken });
      this.fetchHomeData();
    });
  }

  authTrello = () => {
    Linking.openURL(Trello.getLoginURL());
  };

  fetchHomeData = () => {
    const {token} = this.props;

    this.props.fetchCurrentSprint();

    // get my projects
    // TODO get projects from scrumble
    Trello.getUser(token.trello).then(user => {
      Scrumble.getCurrentProject(token.scrumble).then(currentProject => {
        Scrumble.getCurrentSprint(token.scrumble).then(currentSprint => {
          this.setState({
            boards: user.boards,
            user: {
              id: user.id,
              name: user.fullName,
            },
            currentProject,
            currentSprint,
          });
        });
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

  renderLoggedIn = () => {
    const { user, currentSprint, currentProject } = this.state;

    let lead = null;
    let leadQualifier = '';
    if (currentSprint) {
      const todayPerformance = currentSprint.bdcData.find(data => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(data.date).getTime() === today.getTime();
      });

      if (todayPerformance) {
        lead = todayPerformance.done - todayPerformance.standard;
        leadQualifier = lead >= 0 ? 'ahead' : 'late';
      }

      // TODO translate J/H
    }

    return (
      <View>
        <Text style={styles.welcome}>
          {user ? `Hello ${user.name}!` : 'Loading...'}
        </Text>
        {currentProject && <Text style={styles.project}>{currentProject.name}</Text>}
        {currentSprint && <Text style={styles.sprint}>{`#${currentSprint.number}: ${currentSprint.goal}`}</Text>}
        {lead !== null && <Text style={{color: lead >= 0 ? 'green' : 'red'}}>{`You're ${leadQualifier} of ${lead > 0 ? lead : -lead} pts`}</Text>}
      </View>
    );
  };

  render() {
    return (
      <Page>
        <View style={styles.container}>
          {this.props.isLoggedIn ? this.renderLoggedIn() : this.renderLoggedOut()}
        </View>
      </Page>
    );
  }
}

type PropsType = AuthType & {
  navigation: any,
  login: Function,
  fetchCurrentSprint: Function,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '20%',
    alignItems: 'center',
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
  fetchCurrentSprint,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
