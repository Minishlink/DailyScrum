// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import LottieAnimation from 'lottie-react-native';
import { Text } from '../../../components';
import appStyle from '../../../appStyle';
import { todayTargetSelector } from '../../../modules/sprints/reducer';
import { roundToDecimalPlace } from '../../../services/MathService';

class PointsStatus extends PureComponent<Props> {
  showLeadingText = () => {
    const { lead } = this.props;
    if (!lead) return "You're just getting started!";

    const prefix = lead.points >= 0 ? 'Lead' : 'Lateness';

    const shownPoints = roundToDecimalPlace(lead.points > 0 ? lead.points : -lead.points).toLocaleString();
    const shownManDays = roundToDecimalPlace(lead.manDays > 0 ? lead.manDays : -lead.manDays).toLocaleString();
    const suffix = `${shownPoints} pts / ${shownManDays} man-days`;

    return prefix + ': ' + suffix;
  };

  render() {
    const { lead, pointsLeft, todayTarget } = this.props;
    const isLeading = !(lead && lead.points < 0);
    return (
      <View style={styles.container}>
        <View style={styles.starContainer}>
          <LottieAnimation
            source={
              isLeading
                ? require('../../../../assets/lottie/sun_happy.json')
                : require('../../../../assets/lottie/sad_cloud.json')
            }
            style={styles.image}
            loop
            autoPlay
          />
        </View>
        <View style={styles.statusContainer}>
          {pointsLeft != null &&
            pointsLeft <= 0 && (
              <View style={styles.pointsLeftAnimationContainer}>
                <LottieAnimation
                  source={require('../../../../assets/lottie/colorline.json')}
                  loop
                  autoPlay
                  duration={2000}
                />
              </View>
            )}
          <Text style={[styles.lead, { color: isLeading ? appStyle.colors.green : appStyle.colors.red }]}>
            {this.showLeadingText()}
          </Text>
          <Text style={styles.pointsLeft}>
            {pointsLeft != null && pointsLeft > 0
              ? `Left overall: ${roundToDecimalPlace(pointsLeft).toLocaleString()} pts`
              : `Congratulations, this sprint is a success!`}
          </Text>
          {todayTarget != null && (
            <Text style={styles.pointsLeft}>
              Left for today: {todayTarget > 0 ? roundToDecimalPlace(todayTarget).toLocaleString() : 0} pts
            </Text>
          )}
        </View>
      </View>
    );
  }
}

type Props = {
  lead: ?{
    points: number,
    manDays: number,
  },
  pointsLeft: ?number,
  todayTarget: ?number,
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
    marginTop: 5,
    textAlign: 'center',
  },
  pointsLeftAnimationContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center', // normal behaviour
  },
});

const mapStateToProps = state => ({
  todayTarget: todayTargetSelector(state),
});

export default connect(mapStateToProps)(PointsStatus);
