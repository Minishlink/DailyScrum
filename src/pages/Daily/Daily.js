// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { Page, createErrorBar, NoProjectFound, Text } from 'DailyScrum/src/components';
import { fetchBaseData } from 'DailyScrum/src/modules/common';
import { currentSprintSelector } from '../../modules/sprints/reducer';
import { currentProjectSelector } from '../../modules/projects/reducer';
import { yesterdayTotalSelector, todayTotalSelector } from '../../modules/cards/reducer';
import type { SprintType, ProjectType } from '../../types';
import { isSyncingSelector } from '../../modules/sync';
import Today from './Today';
import Yesterday from './Yesterday';
import appStyle from '../../appStyle';
import Summary from './components/Summary';
const ErrorBar = createErrorBar({ common: 'base' });

class Daily extends Component {
  props: PropsType;
  scrollView: any;

  state = {
    index: 0,
    routes: [{ key: 'yesterday', title: 'Yesterday' }, { key: 'today', title: 'Today' }],
  };

  componentDidMount() {
    this.props.fetchBaseData();
    SplashScreen.hide();
  }

  registerMainScrollView = scrollViewRef => (this.scrollView = scrollViewRef);

  _handleIndexChange = index => this.setState({ index });

  renderTabLabel = ({ route, focused }) => {
    const { yesterdayTotal, todayTotal } = this.props;
    let title = route.title.toUpperCase();
    switch (route.key) {
      case 'yesterday':
        if (yesterdayTotal != null) {
          title += ` (${Math.round(yesterdayTotal).toLocaleString()})`;
        }
        break;
      case 'today':
        if (todayTotal != null) {
          title += ` (${Math.round(todayTotal).toLocaleString()})`;
        }
        break;
      default:
        break;
    }

    return (
      <Text style={[styles.headerTabLabelStyle, focused && styles.focusedHeaderTabLabelStyle]}>
        {title}
      </Text>
    );
  };

  onTabPress = ({ focused }) => focused && this.scrollView && this.scrollView.scrollTo({ x: 0, animated: true });

  _renderHeader = props =>
    <TabBar
      style={styles.headerStyle}
      indicatorStyle={styles.headerTabIndicatorStyle}
      pressOpacity={0.7}
      renderLabel={this.renderTabLabel}
      onTabPress={this.onTabPress}
      {...props}
    />;

  _renderScene = SceneMap({
    today: Today,
    yesterday: Yesterday,
  });

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
      <View>
        <ErrorBar />
        <ScrollView
          ref={this.registerMainScrollView}
          style={styles.headerStyle}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Summary currentSprint={currentSprint} />
          <TabViewAnimated
            style={styles.cardsContainer}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onIndexChange={this._handleIndexChange}
          />
        </ScrollView>
      </View>
    );
  }
}

type PropsType = {
  navigation: any,
  login: Function,
  fetchBaseData: Function,
  currentSprint: ?SprintType,
  currentProject: ?ProjectType,
  yesterdayTotal: number,
  todayTotal: number,
  isSyncing: boolean,
};

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    marginBottom: 0,
  },
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTabLabelStyle: {
    color: appStyle.colors.text,
  },
  focusedHeaderTabLabelStyle: {
    color: appStyle.colors.primary,
  },
  headerTabIndicatorStyle: {
    backgroundColor: appStyle.colors.primary,
  },
});

const mapStateToProps = state => ({
  currentSprint: currentSprintSelector(state),
  currentProject: currentProjectSelector(state),
  yesterdayTotal: yesterdayTotalSelector(state),
  todayTotal: todayTotalSelector(state),
  isSyncing: isSyncingSelector(state, 'projects', 'current'),
});

const mapDispatchToProps = {
  fetchBaseData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Daily);
