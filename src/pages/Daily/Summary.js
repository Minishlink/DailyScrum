// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Page, TrelloCard, BigButton, createErrorBar } from 'DailyScrum/src/components';
import { fetchBaseData } from 'DailyScrum/src/modules/common';
import { currentSprintSelector } from '../../modules/sprints/reducer';
import { currentProjectSelector } from '../../modules/projects/reducer';
import { yesterdayTotalSelector, todayTotalSelector } from '../../modules/cards/reducer';
import type { SprintType, ProjectType } from '../../types';
const ErrorBar = createErrorBar({ common: 'base' });

class Summary extends Component {
  props: PropsType;

  componentDidMount() {
    this.props.fetchBaseData();
  }

  render() {
    const { currentSprint, currentProject } = this.props;
    if (!currentSprint || !currentProject) return <Page isLoading />;
    const { lead, pointsLeft } = currentSprint;
    return (
      <Page>
        <ErrorBar />
        <View style={styles.container}>
          <Animatable.View animation="fadeIn" delay={200} style={styles.sprintGoal}>
            <TrelloCard title={currentSprint.goal} isSprintGoal />
          </Animatable.View>
          {lead != null &&
            <Animatable.Text animation="fadeInLeft" style={{ color: lead.points >= 0 ? 'green' : 'red' }}>
              {`${lead.points >= 0 ? 'Lead' : 'Lateness'}: ${lead.points > 0 ? lead.points : -lead.points} pts / ${lead.manDays > 0 ? lead.manDays : -lead.manDays} man-days`}
            </Animatable.Text>}
          {pointsLeft != null &&
            (pointsLeft > 0
              ? <Animatable.Text animation="fadeInRight">Left overall: {pointsLeft} pts</Animatable.Text>
              : <Animatable.Text animation="fadeInRight">
                  Congratulations! You finished your sprint, and you have {-pointsLeft} points of bonus.
                </Animatable.Text>)}
          <View style={styles.buttons}>
            <BigButton
              style={styles.button}
              icon={{ name: 'chevron-left' }}
              title={`Yesterday (${this.props.yesterdayTotal.toLocaleString()})`}
              onPress={() => this.props.navigation.navigate('yesterday')}
            />
            <BigButton
              style={styles.button}
              icon={{ name: 'chevron-right', right: true }}
              title={`Today (${this.props.todayTotal.toLocaleString()})`}
              onPress={() => this.props.navigation.navigate('today')}
            />
          </View>
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
  yesterdayTotal: number,
  todayTotal: number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  sprintGoal: {
    marginVertical: 20,
    width: 0.75 * Dimensions.get('window').width,
  },
  buttons: {
    position: 'absolute',
    bottom: 25,
  },
  button: {
    marginTop: 10,
  },
});

const mapStateToProps = state => ({
  currentSprint: currentSprintSelector(state),
  currentProject: currentProjectSelector(state),
  yesterdayTotal: yesterdayTotalSelector(state),
  todayTotal: todayTotalSelector(state),
});

const mapDispatchToProps = {
  fetchBaseData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
