import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import appStyle from '../../../appStyle';

class DailyHeader extends Component {
  state: StateType = { height: 0 };

  render() {
    const height = this.state.height;
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            height: this.props.position.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [height, 0, height],
            }),
          }}
        >
          <View onLayout={({ nativeEvent }) => this.setState({ height: nativeEvent.layout.height })} />
        </Animated.View>
      </View>
    );
  }
}

type StateType = {
  height: number,
};

const styles = StyleSheet.create({
  container: {
    ...appStyle.header.containerStyle,
    ...appStyle.header.containerShadowStyle,
    height: 1,
  },
});

export default DailyHeader;
