import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import SprintGoal from './SprintGoal';
import PointsStatus from './PointsStatus';

export default class Summary extends Component {
  props: PropsType;

  render() {
    const { currentSprint } = this.props;
    return (
      <View style={styles.container}>
        <Animatable.View animation="fadeIn" delay={200} style={styles.sprintGoalAndPointsStatus} useNativeDriver>
          <SprintGoal title={currentSprint.goal} />
          <PointsStatus lead={currentSprint.lead} pointsLeft={currentSprint.pointsLeft} />
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  sprintGoalAndPointsStatus: {
    width: 0.75 * Dimensions.get('window').width,
  },
});

type PropsType = {
  currentSprint: ?SprintType,
};
