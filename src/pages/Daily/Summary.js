// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { distanceInWordsToNow } from 'date-fns';
import { Page, TrelloCard, Icon, Button } from 'DailyScrum/src/components';
import { fetchBaseData } from 'DailyScrum/src/modules/common';
import { currentSprintSelector } from '../../modules/sprints/reducer';
import { currentProjectSelector } from '../../modules/projects/reducer';
import { isSyncingSelector } from '../../modules/sync';
import { lastSuccessfulSyncDateSelector } from '../../modules/common/reducer';
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
          <Animatable.Text animation="slideInDown" style={styles.projectTitle}>{currentProject.name}</Animatable.Text>
          <Animatable.View animation="fadeIn" delay={200} style={styles.sprintGoal}>
            <TrelloCard title={currentSprint.goal} isSprintGoal />
          </Animatable.View>
          {lead != null &&
            <Animatable.Text animation="fadeInLeft" style={{ color: lead.points >= 0 ? 'green' : 'red' }}>
              {`You're ${lead.points >= 0 ? 'ahead' : 'late'} of ${lead.points > 0 ? lead.points : -lead.points} pts (${lead.manDays > 0 ? lead.manDays : -lead.manDays} man-days)`}
            </Animatable.Text>}
          {pointsLeft != null &&
            (pointsLeft > 0
              ? <Animatable.Text animation="fadeInRight">There are {pointsLeft} points left.</Animatable.Text>
              : <Animatable.Text animation="fadeInRight">
                  Congratulations! You finished your sprint, and you have {-pointsLeft} points of bonus.
                </Animatable.Text>)}
          <Animatable.View animation="fadeIn" style={styles.sync}>
            <Button disabled={this.props.isSyncing} onPress={this.refresh}>
              <Animatable.View animation={this.props.isSyncing ? 'rotate' : null} iterationCount="infinite">
                <Icon name="refresh" size={25} />
              </Animatable.View>
            </Button>
            {this.props.lastSuccessfulSync &&
              <Text>Last: {distanceInWordsToNow(this.props.lastSuccessfulSync, { addSuffix: true })}</Text>}
          </Animatable.View>
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
  lastSuccessfulSync: ?Date,
  isSyncing: boolean,
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
    width: 0.75 * Dimensions.get('window').width,
  },
  sync: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  currentSprint: currentSprintSelector(state),
  currentProject: currentProjectSelector(state),
  lastSuccessfulSync: lastSuccessfulSyncDateSelector(state),
  isSyncing: isSyncingSelector(state, 'common', 'base'),
});

const mapDispatchToProps = {
  fetchBaseData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
