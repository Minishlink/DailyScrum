// @flow
import React, { PureComponent } from 'react';
import { View, Linking } from 'react-native';
import { Button, Icon, Text } from './index';
import appStyle from '../appStyle';

type Props = {
  withIcon: boolean,
  containerStyle: any,
  textStyle: any,
  url: string,
  text: string,
  iconName: string,
  iconType: string,
};

class AppDownload extends PureComponent<Props> {
  download = () => Linking.openURL(this.props.url);
  render() {
    return (
      <Button onPress={this.download} hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}>
        <View style={this.props.containerStyle}>
          {this.props.withIcon && (
            <Icon name={this.props.iconName} type={this.props.iconType} size={20} color={appStyle.colors.text} />
          )}
          <Text style={this.props.textStyle}>{this.props.text}</Text>
        </View>
      </Button>
    );
  }
}

export const AndroidDownload = (props: any) => (
  <AppDownload
    {...props}
    iconName="google-play"
    iconType="material-community"
    url="https://play.google.com/store/apps/details?id=tech.bam.DailyScrum"
    text="Android"
  />
);

export const IOSDownload = (props: any) => (
  <AppDownload
    {...props}
    iconName="ios-appstore"
    iconType="ionicons"
    url="https://itunes.apple.com/app/dailyscrum/id1286338464"
    text="iOS"
  />
);
