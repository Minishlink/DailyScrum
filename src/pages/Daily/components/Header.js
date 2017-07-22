import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import appStyle from '../../../appStyle';
import makeFilterMembers from '../../../components/CardLists/FilterMembers';

const TodayFilterMembers = makeFilterMembers('today');
const YesterdayFilterMembers = makeFilterMembers('yesterday');

class DailyHeader extends Component {
  state: StateType = { yesterdayHeight: 0, todayHeight: 0 };

  shouldComponentUpdate(nextProps: PropsType, nextState: StateType) {
    return nextState.yesterdayHeight !== this.state.yesterdayHeight || nextState.todayHeight !== this.state.todayHeight;
  }

  setTodayHeight = ({ nativeEvent }) => this.setState({ todayHeight: nativeEvent.layout.height });
  setYesterdayHeight = ({ nativeEvent }) => this.setState({ yesterdayHeight: nativeEvent.layout.height });

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
          <View onLayout={this.setYesterdayHeight}>
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
          <View onLayout={this.setTodayHeight}>
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
