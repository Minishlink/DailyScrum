import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { distanceInWordsToNow } from 'date-fns';
import { Icon, Button } from 'DailyScrum/src/components';
import { fetchBaseData } from 'DailyScrum/src/modules/common';
import { currentProjectSelector } from '../modules/projects/reducer';
import { isSyncingSelector } from '../modules/sync';
import { lastSuccessfulSyncDateSelector } from '../modules/common/reducer';
import type { ProjectType } from '../types';
import appStyle, { STATUSBAR_HEIGHT } from '../appStyle';

class Header extends Component {
  props: PropsType;

  render() {
    const { project } = this.props;

    return (
      <Animated.View style={[styles.container, this.props.containerStyle]}>
        <View style={styles.actions}>
          <Button
            onPress={() => this.props.navigation.navigate('projectSettings')}
            hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}
          >
            <View style={styles.action}>
              <Icon type="material" name="view-module" size={16} />
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
              <Animatable.View animation={this.props.isSyncing ? 'rotate' : null} iterationCount="infinite">
                <Icon name="refresh" size={14} />
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
    fontSize: appStyle.font.size.small,
  },
  lastSyncText: {
    marginRight: 5,
  },
  projectTitle: {
    textAlign: 'center',
    fontSize: appStyle.font.size.big,
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
