// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Modal as RCTModal, TouchableWithoutFeedback } from 'react-native';

export default class Modal extends Component {
  props: PropsType;

  // FUTURE remove shouldComponentUpdate if children can change
  shouldComponentUpdate(nextProps: PropsType) {
    return nextProps.visible !== this.props.visible;
  }

  render() {
    const { onRequestClose, visible, children, backgroundStyle, ...rest } = this.props;
    return (
      <RCTModal animationType="fade" transparent visible={visible} onRequestClose={onRequestClose} {...rest}>
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={[styles.background, backgroundStyle]} />
        </TouchableWithoutFeedback>
        {children}
      </RCTModal>
    );
  }
}

type PropsType = {
  onRequestClose: Function,
  visible: boolean,
  children?: React$Element<any>,
  style: any,
  backgroundStyle: any,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.8,
  },
});
