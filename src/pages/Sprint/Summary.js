// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Page, NoProjectFound } from '../../components';
import { currentProjectSelector } from '../../modules/projects/reducer';
import type { ProjectType } from '../../types/Project';
import { isSyncingSelector } from '../../modules/sync';
import SprintPicker from './components/SprintPicker';
import BDC from './components/BDC';
import QualityIndicators from './components/QualityIndicators';
import appStyle from '../../appStyle';

class Summary extends Component<Props> {
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
      <Page noMargin>
        <SprintPicker />
        <View style={styles.content}>
          <BDC />
          <QualityIndicators style={styles.qualityIndicators} />
        </View>
      </Page>
    );
  }
}

type Props = {
  navigation: any,
  project: ProjectType,
  isSyncing: boolean,
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginHorizontal: appStyle.margin - appStyle.shadow.radius,
    marginVertical: 2 * appStyle.margin - appStyle.shadow.radius,
  },
  qualityIndicators: {
    marginTop: appStyle.margin - appStyle.shadow.radius,
  },
});

const mapStateToProps = state => ({
  project: currentProjectSelector(state),
  isSyncing: isSyncingSelector(state, 'projects', 'current'),
});

export default connect(mapStateToProps)(Summary);
