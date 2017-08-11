// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Animated } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Page, createErrorBar, NoProjectFound } from 'DailyScrum/src/components';
import { fetchBaseData } from 'DailyScrum/src/modules/common';
import { currentSprintSelector } from '../../modules/sprints/reducer';
import { currentProjectSelector } from '../../modules/projects/reducer';
import type { SprintType, ProjectType } from '../../types';
import { isSyncingSelector } from '../../modules/sync';
import Summary from './components/Summary';
import CardTab from './components/CardTab';
import appStyle from '../../appStyle';
const ErrorBar = createErrorBar({ common: 'base' });

class Daily extends Component {
  props: PropsType;
  state: StateType = {
    scrollCardsY: new Animated.Value(0),
    summaryHeight: 0,
  };

  componentDidMount() {
    //this.props.fetchBaseData();
    SplashScreen.hide();
  }

  onScrollCards = Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollCardsY } } }], {
    useNativeDriver: true,
  });
  measureHeader = ({ nativeEvent }: any) => this.setState({ summaryHeight: nativeEvent.layout.height });

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

    const { summaryHeight, scrollCardsY } = this.state;

    return (
      <View style={styles.container}>
        <ErrorBar />
        <Animated.View
          style={[
            styles.content,
            {
              transform: [
                {
                  translateY: scrollCardsY.interpolate({
                    inputRange: [0, summaryHeight],
                    outputRange: [0, -summaryHeight],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              marginBottom: -summaryHeight,
            },
          ]}
        >
          <View style={styles.header} onLayout={this.measureHeader}>
            <Summary currentSprint={currentSprint} />
          </View>
          <CardTab style={styles.cardsContainer} onScrollCards={this.onScrollCards} />
        </Animated.View>
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

type StateType = {
  scrollCardsY: any,
  summaryHeight: number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: appStyle.colors.background,
  },
  header: {
    backgroundColor: 'white',
  },
  cardsContainer: {
    flex: 1,
    paddingBottom: 56, // bottom navigation height
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
