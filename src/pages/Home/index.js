// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Linking, Button } from 'react-native';
import { Page } from 'DailyScrum/src/components';
import appStyle from 'DailyScrum/src/appStyle';
import { Trello, Scrumble } from 'DailyScrum/src/services';
import { login } from 'DailyScrum/src/modules/auth';
import { authSelector } from 'DailyScrum/src/modules/auth/reducer';
import type { AuthType } from '../../modules/auth/reducer';
import { fetchCurrentSprint } from 'DailyScrum/src/modules/sprints';
import { fetchCurrentProject } from 'DailyScrum/src/modules/projects';
import { currentSprintSelector } from '../../modules/sprints/reducer';
import { currentProjectSelector } from '../../modules/projects/reducer';
import { currentBoardSelector } from '../../modules/boards/reducer';
import type { SprintType } from '../../modules/sprints/reducer';
import type { ProjectType } from '../../modules/projects/reducer';
import type { BoardType } from '../../modules/boards/reducer';

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
    this.props.fetchCurrentProject();
    this.props.fetchCurrentSprint();

    // get my projects
    // TODO get projects from
    // TODO create sagas for this
    const { token } = this.props;
    Trello.getUser(token.trello).then(user => {
      this.setState({
        boards: user.boards,
        user: {
          id: user.id,
          name: user.fullName,
        },
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
    const { user } = this.state;
    const { currentSprint, currentProject } = this.props;

    let lead = null;
    if (currentSprint) {
      lead = currentSprint.lead;
    }

    return (
      <View>
        <Text style={styles.welcome}>
          {user ? `Hello ${user.name}!` : 'Loading...'}
        </Text>
        {currentProject && <Text style={styles.project}>{currentProject.name}</Text>}
        {currentSprint && <Text style={styles.sprint}>{`#${currentSprint.number}: ${currentSprint.goal}`}</Text>}
        {lead !== null &&
          <Text style={{ color: lead.points >= 0 ? 'green' : 'red' }}>
            {
              `You're ${lead.points >= 0 ? 'ahead' : 'late'} of ${lead.points > 0 ? lead.points : -lead.points} pts (${lead.manDays > 0 ? lead.manDays : -lead.manDays} man-days)`
            }
          </Text>}
      </View>
    );
  };

  render() {
    const { currentBoard } = this.props;
    return (
      <Page backgroundColor={currentBoard ? currentBoard.prefs.backgroundColor : ""}>
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
  currentSprint: ?SprintType,
  fetchCurrentProject: Function,
  currentProject: ?ProjectType,
  currentBoard: ?BoardType,
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
  currentSprint: currentSprintSelector(state),
  currentProject: currentProjectSelector(state),
  currentBoard: currentBoardSelector(state),
});

const mapDispatchToProps = {
  login,
  fetchCurrentSprint,
  fetchCurrentProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
