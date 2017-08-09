import React, { Component } from 'react';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LottieAnimation } from '../../../components';
import SprintGoal from './SprintGoal';
import PointsStatus from './PointsStatus';

export default class Summary extends Component {
  props: PropsType;

  render() {
    const { currentSprint } = this.props;
    return (
      <View>
        {currentSprint.pointsLeft != null &&
          currentSprint.pointsLeft <= 0 &&
          <View style={styles.pointsLeftAnimationContainer}>
            <LottieAnimation source={require('../../../../assets/lottie/colorline.json')} loop />
          </View>}
        <View style={styles.container}>
          <Animatable.View animation="fadeIn" delay={200} style={styles.sprintGoalAndPointsStatus} useNativeDriver>
            <SprintGoal title={currentSprint.goal} />
            <PointsStatus lead={currentSprint.lead} pointsLeft={currentSprint.pointsLeft} />
          </Animatable.View>
        </View>
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
  pointsLeftAnimationContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        top: 150, // iOS lottie positioning is buggy
      },
      android: {
        justifyContent: 'center', // normal behaviour
      },
    }),
  },
});

type PropsType = {
  currentSprint: ?SprintType,
};
