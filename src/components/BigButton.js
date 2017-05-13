import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, Icon } from 'DailyScrum/src/components';
import appStyle from '../appStyle';

export default class BigButton extends Component {
  props: PropsType;

  render() {
    const { icon, title, style, ...buttonProps } = this.props;
    return (
      <Button style={[styles.container, style]} {...buttonProps}>
        {icon && !icon.right && <Icon color="white" size={20} name={icon.name} />}
        <Text style={styles.buttonText}>{title}</Text>
        {icon && icon.right && <Icon color="white" size={20} name={icon.name} />}
      </Button>
    );
  }
}

type PropsType = {
  style: any,
  icon?: {
    name: string,
    type?: string,
    right?: boolean,
  },
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 3,
    backgroundColor: appStyle.colors.primary,
  },
  buttonText: {
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 20,
  },
});
