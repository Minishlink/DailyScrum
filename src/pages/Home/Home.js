// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Linking, Button } from 'react-native';
import { Page, TrelloCard } from 'DailyScrum/src/components';
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
    const { currentSprint, currentProject } = this.props;
    const isLoading = !currentSprint || !currentProject;

    if (isLoading)
      return (
        <View>
          <Text style={styles.welcome}>Loading...</Text>
        </View>
      );

    let lead = null;
    if (currentSprint) {
      lead = currentSprint.lead;
    }

    return (
      <View>
        <View style={styles.projectTitle}>
          <Text>{currentProject.name}</Text>
        </View>
        <View style={styles.sprintGoal}>
          <TrelloCard title={currentSprint.goal} isSprintGoal />
        </View>
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
      <Page backgroundColor={currentBoard ? currentBoard.prefs.backgroundColor : ''}>
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
  projectTitle: {
    backgroundColor: appStyle.colors.background,
    //elevation: 1,
    //shadowColor: appStyle.colors.darkGray,
    //shadowRadius: 10,
    //shadowOpacity: 0.5,
  },
  sprintGoal: {
    marginVertical: 30,
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
