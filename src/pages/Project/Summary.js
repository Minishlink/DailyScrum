// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';
import { Page, NoProjectFound } from 'DailyScrum/src/components';
import { currentProjectSelector } from '../../modules/projects/reducer';
import type { ProjectType } from '../../types/Project';
import { isSyncingSelector } from '../../modules/sync';
import SuccessMatrix from './components/SuccessMatrix';
import appStyle from '../../appStyle';

class Summary extends Component {
  props: PropsType;

  render() {
    const { project, isSyncing } = this.props;
    if (!project) {
      if (isSyncing) return <Page isLoading />;
      // TODO show less generic placeholder
      return (
        <Page>
          <NoProjectFound />
        </Page>
      );
    }

    return (
      <Page noMargin style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <SuccessMatrix style={styles.matrix} />
        </ScrollView>
      </Page>
    );
  }
}

type PropsType = {
  navigation: any,
  project: ProjectType,
  isSyncing: boolean,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: appStyle.margin - appStyle.shadow.radius,
  },
  scrollViewContent: {
    paddingVertical: appStyle.margin,
  },
  matrix: {
    marginVertical: appStyle.margin,
  },
});

const mapStateToProps = state => ({
  project: currentProjectSelector(state),
  isSyncing: isSyncingSelector(state, 'projects', 'current'),
});

export default connect(mapStateToProps)(Summary);
