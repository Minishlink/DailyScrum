// @flow
import React, { Component } from 'react';
import { View, Animated, Platform, StyleSheet } from 'react-native';
import Animation from 'lottie-react-native';

const linearEasing = t => t;

export default class LottieAnimation extends Component<void, PropsType, StateType> {
  state = {
    progress: new Animated.Value(0),
  };

  shouldComponentUpdate(nextProps: PropsType) {
    return this.props.source.nm !== nextProps.source.nm;
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.source.nm !== prevProps.source.nm) {
      this.animate();
    }
  }

  animate = () => {
    const animation = this.props.animation ? this.props.animation(this.state.progress) : this.getDefaultAnimation();
    this.state.progress.setValue(0);
    animation.start(this.props.loop ? this.animate : null);
  };

  getDefaultAnimation = () =>
    Animated.timing(this.state.progress, {
      toValue: 1,
      delay: this.props.delay,
      easing: this.props.easing ? this.props.easing : linearEasing,
      duration: this.props.duration || Math.round(this.props.source.op / this.props.source.fr * 1000),
      useNativeDriver: true,
    });

  render() {
    const { style, source, ...rest } = this.props;
    const aspectRatio = source.w / source.h;
    const styleObject = StyleSheet.flatten(style);
    return (
      <View
        style={[
          {
            aspectRatio,
          },
          (!styleObject || (styleObject.width === undefined && styleObject.height === undefined)) && {
            width: source.w,
          },
          style,
        ]}
      >
        <Animation
          progress={this.state.progress}
          style={{
            aspectRatio,
            width: '100%',
          }}
          source={Platform.select({
            ios: source,
            android: {
              ...source,
              fr: Math.round(source.fr),
              ip: Math.round(source.ip),
              op: Math.round(source.op),
            },
          })}
          {...rest}
        />
      </View>
    );
  }
}

type StateType = {
  progress: Animated.Value,
};

type PropsType = {
  style: any,
  source: Object, // require('path/to/animation.json')
  animation?: Animated.Value => Object, // Animated.Value => CompositeAnimation
  loop?: boolean,
  duration?: number,
  delay?: number,
  easing?: Function,
};
