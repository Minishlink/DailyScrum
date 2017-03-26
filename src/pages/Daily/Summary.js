// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Page, TrelloCard } from 'DailyScrum/src/components';
import { fetchCurrentSprint } from 'DailyScrum/src/modules/sprints';
import { fetchCurrentProject } from 'DailyScrum/src/modules/projects';
import { currentSprintSelector } from '../../modules/sprints/reducer';
import { currentProjectSelector } from '../../modules/projects/reducer';
import type { SprintType } from '../../modules/sprints/reducer';
import type { ProjectType } from '../../modules/projects/reducer';

class Summary extends Component {
  props: PropsType;

  componentDidMount() {
    this.props.fetchCurrentProject();
    this.props.fetchCurrentSprint();
  }

  render() {
    const { currentSprint, currentProject } = this.props;
    if (!currentSprint || !currentProject) return <Page isLoading />;

    let lead = null;
    if (currentSprint) {
      lead = currentSprint.lead;
    }

    return (
      <Page>
        <View style={styles.container}>
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
      </Page>
    );
  }
}

type PropsType = {
  navigation: any,
  login: Function,
  fetchCurrentSprint: Function,
  currentSprint: ?SprintType,
  fetchCurrentProject: Function,
  currentProject: ?ProjectType,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: 20,
  },
  projectTitle: {
    backgroundColor: 'transparent',
  },
  sprintGoal: {
    marginVertical: 30,
  },
});

const mapStateToProps = state => ({
  currentSprint: currentSprintSelector(state),
  currentProject: currentProjectSelector(state),
});

const mapDispatchToProps = {
  fetchCurrentSprint,
  fetchCurrentProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
