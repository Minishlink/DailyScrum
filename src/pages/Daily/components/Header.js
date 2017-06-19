import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import appStyle from '../../../appStyle';
import makeFilterMembers from '../../../components/CardLists/FilterMembers';

const TodayFilterMembers = makeFilterMembers('today');
const YesterdayFilterMembers = makeFilterMembers('yesterday');

class DailyHeader extends Component {
  state: StateType = { yesterdayHeight: 0, todayHeight: 0 };

  render() {
    const { yesterdayHeight, todayHeight } = this.state;
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            height: this.props.position.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [yesterdayHeight + 1, 0, 0],
            }),
            overflow: 'hidden',
          }}
        >
          <View onLayout={({ nativeEvent }) => this.setState({ yesterdayHeight: nativeEvent.layout.height })}>
            <YesterdayFilterMembers
              contentContainerStyle={styles.filterContentContainer}
              style={styles.filterContainer}
            />
          </View>
        </Animated.View>
        <Animated.View
          style={{
            height: this.props.position.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [0, 0, todayHeight + 1],
            }),
            overflow: 'hidden',
          }}
        >
          <View onLayout={({ nativeEvent }) => this.setState({ todayHeight: nativeEvent.layout.height })}>
            <TodayFilterMembers contentContainerStyle={styles.filterContentContainer} style={styles.filterContainer} />
          </View>
        </Animated.View>
      </View>
    );
  }
}

type StateType = {
  yesterdayHeight: number,
  todayHeight: number,
};

const styles = StyleSheet.create({
  container: {
    ...appStyle.header.containerStyle,
    ...appStyle.header.containerShadowStyle,
    minHeight: 1,
  },
  filterContainer: {
    height: 60, // fixes slow animation
  },
  filterContentContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default DailyHeader;
