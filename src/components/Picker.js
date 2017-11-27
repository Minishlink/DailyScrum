import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import RCTPicker from 'Picker';
import appStyle from '../appStyle';

export default class Picker extends Component {
  props: PropsType;

  render() {
    const { style, ...rest } = this.props;
    return (
      <View style={[styles.pickerContainer, style]}>
        <RCTPicker {...rest}>{this.props.children}</RCTPicker>
      </View>
    );
  }
}

type PropsType = {
  style?: any,
};

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: 'white',
    ...appStyle.shadowStyle,
  },
});
