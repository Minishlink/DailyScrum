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
    summaryHeight: 0,
    hideHeader: false,
  };
  scrollCardsY = new Animated.Value(0);

  componentDidMount() {
    //this.props.fetchBaseData();
    SplashScreen.hide();
  }

  measureHeader = ({ nativeEvent }: any) => this.setState({ summaryHeight: nativeEvent.layout.height });

  onTabPress = ({ focused }) => focused && this.changeHeaderVisibility(this.state.hideHeader);

  onScrollCards = e => {
    if (!this.state.hideHeader && e.nativeEvent.contentOffset.y > 120) {
      this.changeHeaderVisibility(false);
    } else if (this.state.hideHeader && e.nativeEvent.contentOffset.y < 0) {
      this.changeHeaderVisibility(true);
    }
  };

  changeHeaderVisibility = (visible: boolean) => {
    this.setState({ hideHeader: !visible });
    Animated.spring(this.scrollCardsY, {
      toValue: visible ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

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
        <View onLayout={this.measureHeader}>
          <Summary currentSprint={currentSprint} />
        </View>
        <Animated.View
          style={{
            flex: 1,
            marginBottom: -this.state.summaryHeight,
            transform: [
              {
                translateY: this.scrollCardsY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -this.state.summaryHeight],
                }),
              },
            ],
          }}
        >
          <CardTab style={styles.cardsContainer} onTabPress={this.onTabPress} onScrollCards={this.onScrollCards} />
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
  summaryHeight: number,
  hideHeader: boolean,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
