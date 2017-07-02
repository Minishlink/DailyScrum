import React, { Component } from 'react';
import { Animated } from 'react-native';
import Animation from 'lottie-react-native';

export default class LottieAnimation extends Component {
  state = {
    progress: new Animated.Value(0),
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.source !== nextProps.source || this.state.progress !== nextState.progress;
  }

  componentDidMount() {
    this.animate();
  }

  animate = () =>
    Animated.loop(
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: this.props.duration || 3000,
      })
    ).start();

  render() {
    const { style, source, ...rest } = this.props;

    return (
      <Animation
        progress={this.state.progress}
        style={[
          {
            width: source.w,
            height: source.h,
          },
          style,
        ]}
        source={source}
        {...rest}
      />
    );
  }
}
