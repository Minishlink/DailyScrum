import React, { Component } from 'react';
import { StyleSheet, View, Picker as RCTPicker } from 'react-native';

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
  style: any,
};

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'grey',
    elevation: 1,
  },
});
