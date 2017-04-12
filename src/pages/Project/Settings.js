// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text } from 'react-native';
import { Page, Icon } from 'DailyScrum/src/components';
import { fetchBoards } from 'DailyScrum/src/modules/boards';

class Settings extends Component {
  props: PropsType;

  refresh = () => {
    this.props.fetchBoards();
  };

  render() {
    return (
      <Page style={styles.container}>
        <Icon name="warning" size={40} color="black" />
        <Text>Project settings is building itself</Text>
        <Text>Want to contribute?</Text>
        <Text>Head over to GitHub or msg me :)</Text>
      </Page>
    );
  }
}

type PropsType = {
  navigation: any,
  fetchBoards: Function,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = {
  fetchBoards,
};

export default connect(null, mapDispatchToProps)(Settings);
