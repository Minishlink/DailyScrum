// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Page, TrelloCard, Icon } from 'DailyScrum/src/components';
import { fetchBaseData } from 'DailyScrum/src/modules/common';
import { currentSprintSelector } from '../../modules/sprints/reducer';
import { currentProjectSelector } from '../../modules/projects/reducer';
import type { SprintType, ProjectType } from '../../types';

class Summary extends Component {
  props: PropsType;

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.props.fetchBaseData();
  };

  render() {
    const { currentSprint, currentProject } = this.props;
    if (!currentSprint || !currentProject) return <Page isLoading />;
    const { lead, pointsLeft } = currentSprint;

    return (
      <Page>
        <View style={styles.container}>
          <Text style={styles.projectTitle}>{currentProject.name}</Text>
          <View style={styles.sprintGoal}>
            <TrelloCard title={currentSprint.goal} isSprintGoal />
          </View>
          {lead != null &&
            <Text style={{ color: lead.points >= 0 ? 'green' : 'red' }}>
              {`You're ${lead.points >= 0 ? 'ahead' : 'late'} of ${lead.points > 0 ? lead.points : -lead.points} pts (${lead.manDays > 0 ? lead.manDays : -lead.manDays} man-days)`}
            </Text>}
          {pointsLeft != null &&
            (pointsLeft > 0
              ? <Text>There are {pointsLeft} points left.</Text>
              : <Text>Congratulations! You finished your sprint, and you have {-pointsLeft} points of bonus.</Text>)}
          <TouchableOpacity style={styles.refreshButton} onPress={this.refresh}>
            <Icon name="refresh" size={30} />
          </TouchableOpacity>
        </View>
      </Page>
    );
  }
}

type PropsType = {
  navigation: any,
  login: Function,
  fetchBaseData: Function,
  currentSprint: ?SprintType,
  currentProject: ?ProjectType,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  projectTitle: {
    backgroundColor: 'transparent',
    fontSize: 25,
    fontWeight: '300',
  },
  sprintGoal: {
    marginVertical: 20,
    minWidth: '80%',
  },
  refreshButton: {
    position: 'absolute',
    bottom: 30,
  },
});

const mapStateToProps = state => ({
  currentSprint: currentSprintSelector(state),
  currentProject: currentProjectSelector(state),
});

const mapDispatchToProps = {
  fetchBaseData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
