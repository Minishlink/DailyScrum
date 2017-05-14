import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'DailyScrum/src/components';
import appStyle from '../appStyle';

export default class BigButton extends Component {
  props: PropsType;

  render() {
    const { icon, title, style, isLoading, ...buttonProps } = this.props;
    return (
      <Button style={[styles.container, style]} {...buttonProps}>
        {icon && !icon.right && <Icon color="white" size={20} name={icon.name} />}
        <View style={styles.contentContainer}>
          {isLoading && <ActivityIndicator color="white" />}
          {!isLoading && <Text style={styles.buttonText}>{title}</Text>}
        </View>
        {icon && icon.right && <Icon color="white" size={20} name={icon.name} />}
      </Button>
    );
  }
}

type PropsType = {
  style: any,
  isLoading?: boolean,
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
    height: 36,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  buttonText: {
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 20,
  },
});
