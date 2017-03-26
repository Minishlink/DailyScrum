// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text } from 'react-native';
import { Page, Icon } from 'DailyScrum/src/components';

class Settings extends Component {
  props: PropsType;

  render() {
    return (
      <Page style={styles.container}>
        <Icon name="warning" size={40} color="black" />
        <Text>Sprint settings is building itself</Text>
        <Text>Want to contribute?</Text>
        <Text>Head over to GitHub or msg me :)</Text>
      </Page>
    );
  }
}

type PropsType = {
  navigation: any,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect()(Settings);
