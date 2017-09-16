import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'DailyScrum/src/components';
import appStyle from '../appStyle';

export default class BigButton extends Component {
  props: PropsType;

  shouldComponentUpdate(nextProps: PropsType) {
    return nextProps.isLoading !== this.props.isLoading || nextProps.title !== this.props.title;
  }

  render() {
    const { icon, title, style, isLoading, ...buttonProps } = this.props;
    return (
      <Button activeOpacity={0.8} style={[styles.container, style]} {...buttonProps}>
        {icon && !icon.right && <Icon color="white" size={20} name={icon.name} />}
        <View
          style={[
            styles.contentContainer,
            icon && icon.right && { paddingRight: 5 },
            icon && !icon.right && { paddingLeft: 5 },
          ]}
        >
          {isLoading && <ActivityIndicator color="white" />}
          {!isLoading &&
            <Text style={styles.buttonText} numberOfLines={1}>
              {title}
            </Text>}
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 3,
    backgroundColor: appStyle.colors.primary,
    height: 36,
    elevation: 2,
    shadowColor: appStyle.colors.darkGray,
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: { height: 1 },
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: appStyle.font.size.big,
  },
});
