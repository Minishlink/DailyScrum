// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Page, BigButton, createErrorBar } from 'DailyScrum/src/components';
import { SprintGoalCard } from './components';
import { fetchBaseData } from 'DailyScrum/src/modules/common';
import { currentSprintSelector } from '../../modules/sprints/reducer';
import { currentProjectSelector } from '../../modules/projects/reducer';
import { yesterdayTotalSelector, todayTotalSelector } from '../../modules/cards/reducer';
import type { SprintType, ProjectType } from '../../types';
import LeadCard from './components/LeadCard';
import PointsLeftCard from './components/PointsLeftCard';
const ErrorBar = createErrorBar({ common: 'base' });

class Summary extends Component {
  props: PropsType;

  componentDidMount() {
    this.props.fetchBaseData();
  }

  render() {
    const { currentSprint, currentProject } = this.props;
    if (!currentSprint || !currentProject) return <Page isLoading />;
    return (
      <Page>
        <ErrorBar />
        <View style={styles.container}>
          <View style={styles.infos}>
            <Animatable.View animation="fadeIn" delay={200} style={styles.sprintGoal}>
              <SprintGoalCard title={currentSprint.goal} />
            </Animatable.View>
            {currentSprint.lead != null &&
              <Animatable.View animation="fadeInLeft">
                <LeadCard lead={currentSprint.lead} />
              </Animatable.View>}
            {currentSprint.pointsLeft != null &&
              <Animatable.View animation="fadeInRight">
                <PointsLeftCard pointsLeft={currentSprint.pointsLeft} />
              </Animatable.View>}
          </View>
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
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sprintGoal: {
    marginBottom: 20,
    width: 0.75 * Dimensions.get('window').width,
  },
  infos: {
    alignItems: 'center',
  },
  buttons: {
    marginBottom: 25,
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
