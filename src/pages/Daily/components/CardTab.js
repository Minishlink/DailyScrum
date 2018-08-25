// @flow
import React, { PureComponent } from 'react';
import { Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { StyleSheet } from 'react-native';
import { Text, Page } from '../../../components';
import Today from './Today';
import Yesterday from './Yesterday';
import appStyle from '../../../appStyle';
import { yesterdayTotalSelector, todayTotalSelector } from '../../../modules/cards/reducer';
import { roundToDecimalPlace } from '../../../services/MathService';
import { HEADER_HEIGHT } from '../../../services/Navigation';

const initialLayout =
  Platform.OS === 'android'
    ? {
        height: 0,
        width: Dimensions.get('window').width,
      }
    : undefined;

class CardTab extends PureComponent<Props, State> {
  state = {
    index: 0,
    routes: [{ key: 'yesterday', title: 'Yesterday' }, { key: 'today', title: 'Today' }],
  };

  onTabPress = ({ route }) => {
    const focused = this.state.routes.indexOf(route) === this.state.index;
    this.props.onTabPress({ route, focused });
  };

  renderTabBar = (props: any) => (
    <TabBar
      style={styles.headerStyle}
      tabStyle={styles.headerTabStyle}
      labelStyle={styles.headerTabLabelStyle}
      indicatorStyle={styles.headerTabIndicatorStyle}
      pressOpacity={0.7}
      pressColor={appStyle.colors.primary}
      renderLabel={this.renderTabLabel}
      onTabPress={this.onTabPress}
      {...props}
    />
  );

  renderScene = SceneMap({
    today: () => (
      <Page style={styles.page} noMargin>
        <Today onScrollCards={this.props.onScrollCards} />
      </Page>
    ),
    yesterday: () => (
      <Page style={styles.page} noMargin>
        <Yesterday onScrollCards={this.props.onScrollCards} />
      </Page>
    ),
  });

  handleIndexChange = (index: number) => this.setState({ index });

  renderTabLabel = ({ route }: { route: { key: string, title: string } }) => {
    const focused = this.state.routes.indexOf(route) === this.state.index;
    const { yesterdayTotal, todayTotal } = this.props;
    let title = route.title;
    switch (route.key) {
      case 'yesterday':
        if (yesterdayTotal != null) {
          title += ` (${roundToDecimalPlace(yesterdayTotal).toLocaleString()})`;
        }
        break;
      case 'today':
        if (todayTotal != null) {
          title += ` (${roundToDecimalPlace(todayTotal).toLocaleString()})`;
        }
        break;
      default:
        break;
    }

    return <Text style={[styles.headerTabLabelStyle, focused && styles.focusedHeaderTabLabelStyle]}>{title}</Text>;
  };

  render() {
    return (
      <TabView
        style={this.props.style}
        navigationState={{
          ...this.state,
          yesterdayTotal: this.props.yesterdayTotal,
          todayTotal: this.props.todayTotal,
        }}
        renderScene={this.renderScene}
        tabBarPosition="top"
        renderTabBar={this.renderTabBar}
        onIndexChange={this.handleIndexChange}
        swipeEnabled
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTabStyle: {
    alignSelf: 'center',
    height: HEADER_HEIGHT,
  },
  headerTabLabelStyle: {
    color: appStyle.colors.lightGray,
    fontWeight: 'bold',
    fontFamily: appStyle.font.family,
  },
  focusedHeaderTabLabelStyle: {
    color: appStyle.colors.primary,
  },
  headerTabIndicatorStyle: {
    backgroundColor: appStyle.colors.primary,
    height: 4,
  },
  page: {
    paddingHorizontal: appStyle.margin - appStyle.shadow.radius,
  },
});

type Props = {
  yesterdayTotal: ?number,
  todayTotal: ?number,
  style?: any,
  onScrollCards: Function,
  onTabPress: Function,
};

type State = {
  index: number,
  routes: Array<{ key: string, title: string }>,
};

const mapStateToProps = state => ({
  yesterdayTotal: yesterdayTotalSelector(state),
  todayTotal: todayTotalSelector(state),
});

export default connect(mapStateToProps)(CardTab);
