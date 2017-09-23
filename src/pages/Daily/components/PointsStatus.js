// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieAnimation from 'easy-lottie-react-native';
import { Text } from '../../../components';

export default (props: PropsType) => {
  const isLeading = !(props.lead && props.lead.points < 0);
  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        <LottieAnimation
          source={
            isLeading
              ? require('../../../../assets/lottie/sun_happy.json')
              : require('../../../../assets/lottie/sun_sad.json')
          }
          style={styles.image}
          loop={isLeading}
        />
      </View>
      <View style={styles.statusContainer}>
        {props.pointsLeft != null &&
          props.pointsLeft <= 0 &&
          <View style={styles.pointsLeftAnimationContainer}>
            <LottieAnimation source={require('../../../../assets/lottie/colorline.json')} loop duration={2000} />
          </View>}
        <Text style={[styles.lead, { color: isLeading ? 'green' : 'red' }]}>
          {props.lead
            ? `${props.lead.points >= 0 ? 'Lead' : 'Lateness'}: ${props.lead.points > 0
                ? props.lead.points
                : -props.lead.points} pts / ${props.lead.manDays > 0
                ? props.lead.manDays
                : -props.lead.manDays} man-days`
            : "You're just getting started!"}
        </Text>
        <Text style={styles.pointsLeft}>
          {props.pointsLeft != null && props.pointsLeft > 0
            ? `Left overall: ${props.pointsLeft} pts`
            : `Congratulations, this sprint is a success!`}
        </Text>
      </View>
    </View>
  );
};

type PropsType = {
  lead?: {
    points: number,
    manDays: number,
  },
  pointsLeft?: number,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
  },
  starContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 17,
  },
  statusContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
  },
  lead: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pointsLeft: {
    marginTop: 7,
    textAlign: 'center',
  },
  pointsLeftAnimationContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center', // normal behaviour
  },
});
