// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text } from 'react-native';
import { Page, Icon } from 'DailyScrum/src/components';
import { currentProjectSelector } from '../../modules/projects/reducer';
import type { ProjectType } from '../../types/Project';

class Summary extends Component {
  props: PropsType;

  render() {
    const { project } = this.props;
    if (!project) return <Page isLoading />;

    return (
      <Page style={styles.container}>
        <Text>{project.name}</Text>
      </Page>
    );
  }
}

type PropsType = {
  navigation: any,
  project: ProjectType,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  project: currentProjectSelector(state),
});

export default connect(mapStateToProps)(Summary);
