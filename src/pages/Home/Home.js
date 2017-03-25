// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Page, TrelloCard, ActionButton } from 'DailyScrum/src/components';
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
import Login from './components/Login';

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
    if (!this.props.navigation.state.params || !this.props.navigation.state.params.token) return;
    const trelloToken = this.props.navigation.state.params.token;
    Scrumble.login(trelloToken).then(scrumbleToken => {
      // store tokens
      this.props.login({ trelloToken, scrumbleToken });
      this.fetchHomeData();
    });
  }

  fetchHomeData = () => {
    this.props.fetchCurrentProject();
    this.props.fetchCurrentSprint();
  };

  render() {
    if (!this.props.isLoggedIn) {
      return <Page><Login /></Page>;
    }

    const { currentSprint, currentProject } = this.props;
    if (!currentSprint || !currentProject) return <Page><Text style={styles.loading}>Loading...</Text></Page>;

    let lead = null;
    if (currentSprint) {
      lead = currentSprint.lead;
    }

    return (
      <Page noMargin>
        <View style={styles.container}>
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
          <View>
            <ActionButton title="What have I done yesterday?"/>
            <ActionButton title="What will I do today?"/>
          </View>
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
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  projectTitle: {
    backgroundColor: 'transparent',
  },
  sprintGoal: {
    marginVertical: 30,
    marginHorizontal: '5%',
  },
  loading: {
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
