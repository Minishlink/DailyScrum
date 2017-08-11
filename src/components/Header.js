// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { distanceInWordsToNow } from 'date-fns';
import { Text, Icon, Button } from 'DailyScrum/src/components';
import { fetchBaseData } from 'DailyScrum/src/modules/common';
import { currentProjectSelector } from '../modules/projects/reducer';
import { isSyncingSelector } from '../modules/sync';
import { lastSuccessfulSyncDateSelector } from '../modules/common/reducer';
import type { ProjectType } from '../types';
import appStyle, { STATUSBAR_HEIGHT } from '../appStyle';
import createErrorBar from './ErrorBar';
const ErrorBar = createErrorBar();

class Header extends Component {
  props: PropsType;

  shouldComponentUpdate(nextProps: PropsType) {
    return (
      this.props.isSyncing !== nextProps.isSyncing ||
      this.props.lastSuccessfulSync !== nextProps.lastSuccessfulSync ||
      (!!this.props.project && !!nextProps.project && this.props.project.name !== nextProps.project.name)
    );
  }

  goToProjectSettings = () => this.props.navigation.navigate('projectSettings');

  render() {
    const { project } = this.props;

    return (
      <Animated.View style={[styles.container, this.props.containerStyle]}>
        <ErrorBar style={styles.errorBar} />
        <View style={styles.actions}>
          <Button onPress={this.goToProjectSettings} hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}>
            <View style={styles.action}>
              <Icon type="material" name="view-module" size={16} color={appStyle.colors.overPrimaryColor} />
              <Text style={styles.actionText}>Change project</Text>
            </View>
          </Button>
          <Button
            disabled={this.props.isSyncing}
            onPress={this.props.fetchBaseData}
            hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}
          >
            <View style={styles.action}>
              {this.props.lastSuccessfulSync &&
                <Text style={[styles.lastSyncText, styles.actionText]}>
                  last {distanceInWordsToNow(this.props.lastSuccessfulSync, { addSuffix: true })}
                </Text>}
              <Animatable.View
                animation={this.props.isSyncing ? 'rotate' : null}
                iterationCount="infinite"
                useNativeDriver
              >
                <Icon name="refresh" size={14} color={appStyle.colors.overPrimaryColor} />
              </Animatable.View>
            </View>
          </Button>
        </View>
        {project &&
          <Text style={styles.projectTitle}>
            {project.name}
          </Text>}
      </Animated.View>
    );
  }
}

type PropsType = {
  fetchBaseData: Function,
  project: ?ProjectType,
  lastSuccessfulSync: ?Date,
  isSyncing: boolean,
  navigation: any,
  containerStyle: any,
};

const styles = StyleSheet.create({
  container: {
    ...appStyle.header.containerStyle,
    paddingHorizontal: 10,
    paddingTop: STATUSBAR_HEIGHT + 5,
    paddingBottom: 5,
    backgroundColor: appStyle.colors.primary,
  },
  errorBar: {
    bottom: 0,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: appStyle.colors.overPrimaryColor,
    fontSize: appStyle.font.size.small,
  },
  lastSyncText: {
    marginRight: 5,
  },
  projectTitle: {
    textAlign: 'center',
    fontSize: appStyle.font.size.big,
    color: appStyle.colors.overPrimaryColor,
    fontWeight: '300',
    marginTop: 2,
  },
});

const mapStateToProps = state => ({
  project: currentProjectSelector(state),
  lastSuccessfulSync: lastSuccessfulSyncDateSelector(state),
  isSyncing: isSyncingSelector(state, 'common', 'base'),
});

const mapDispatchToProps = {
  fetchBaseData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
