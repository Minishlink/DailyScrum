// @flow
import React, { Component } from 'react';
import { Animated } from 'react-native';
import Animation from 'lottie-react-native';

export default class LottieAnimation extends Component<void, PropsType, StateType> {
  state = {
    progress: new Animated.Value(0),
  };

  shouldComponentUpdate(nextProps: PropsType, nextState: StateType) {
    return this.props.source !== nextProps.source || this.state.progress !== nextState.progress;
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    const animation = this.getAnimation();
    if (this.props.loop) {
      Animated.loop(animation).start();
    } else {
      animation.start();
    }
  };

  getAnimation = () =>
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: this.props.duration || 3000,
    });

  render() {
    const { style, source, ...rest } = this.props;

    return (
      <Animation
        progress={this.state.progress}
        style={[
          {
            aspectRatio: source.w / source.h,
            width: source.w,
          },
          style,
        ]}
        source={source}
        {...rest}
      />
    );
  }
}

type StateType = {
  progress: Animated.Value,
};

type PropsType = {
  style: any,
  source: any,
  loop?: boolean,
  duration?: number,
};
