// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text } from 'react-native';
import { Page } from 'DailyScrum/src/components';
import { currentProjectSelector } from '../../modules/projects/reducer';
import type { ProjectType } from '../../types/Project';
import SuccessMatrix from './components/SuccessMatrix';

class Summary extends Component {
  props: PropsType;

  render() {
    const { project } = this.props;
    if (!project) return <Page isLoading />;

    return (
      <Page style={styles.container}>
        <Text>{project.name}</Text>
        <SuccessMatrix style={styles.matrix} />
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
    alignItems: 'center',
    paddingTop: 30,
  },
  matrix: {
    marginTop: 10,
  },
});

const mapStateToProps = state => ({
  project: currentProjectSelector(state),
});

export default connect(mapStateToProps)(Summary);
