// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Page, createErrorBar, NoProjectFound } from 'DailyScrum/src/components';
import { fetchBaseData } from 'DailyScrum/src/modules/common';
import { currentSprintSelector } from '../../modules/sprints/reducer';
import { currentProjectSelector } from '../../modules/projects/reducer';
import type { SprintType, ProjectType } from '../../types';
import { isSyncingSelector } from '../../modules/sync';
import Summary from './components/Summary';
import CardTab from './components/CardTab';
const ErrorBar = createErrorBar({ common: 'base' });

class Daily extends Component {
  props: PropsType;
  scrollView: any;

  componentDidMount() {
    this.props.fetchBaseData();
    SplashScreen.hide();
  }

  registerMainScrollView = scrollViewRef => (this.scrollView = scrollViewRef);

  onTabPress = ({ focused }) => focused && this.scrollView && this.scrollView.scrollTo({ x: 0, animated: true });

  render() {
    const { currentSprint, currentProject, isSyncing } = this.props;
    if (!currentProject || !currentSprint) {
      if (isSyncing) return <Page isLoading />;
      // TODO show less generic placeholder
      return (
        <Page>
          <NoProjectFound />
        </Page>
      );
    }

    return (
      <View style={styles.container}>
        <ErrorBar />
        <ScrollView
          ref={this.registerMainScrollView}
          style={styles.header}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Summary currentSprint={currentSprint} />
          <CardTab style={styles.cardsContainer} onTabPress={this.onTabPress} />
        </ScrollView>
      </View>
    );
  }
}

type PropsType = {
  navigation: any,
  fetchBaseData: Function,
  currentSprint: ?SprintType,
  currentProject: ?ProjectType,
  isSyncing: boolean,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardsContainer: {
    flex: 1,
    marginBottom: 0,
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => ({
  currentSprint: currentSprintSelector(state),
  currentProject: currentProjectSelector(state),
  isSyncing: isSyncingSelector(state, 'projects', 'current'),
});

const mapDispatchToProps = {
  fetchBaseData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Daily);
