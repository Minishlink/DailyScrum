import React, { Component } from 'react';
import { StyleSheet, Platform, View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { distanceInWordsToNow } from 'date-fns';
import { Icon, Button } from 'DailyScrum/src/components';
import { fetchBaseData } from 'DailyScrum/src/modules/common';
import { currentProjectSelector } from '../modules/projects/reducer';
import { isSyncingSelector } from '../modules/sync';
import { lastSuccessfulSyncDateSelector } from '../modules/common/reducer';
import type { ProjectType } from '../types';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const iconSize = 20;

class Header extends Component {
  props: PropsType;

  render() {
    const { project } = this.props;
    if (!project) return null;
    return (
      <View style={styles.container}>
        <View style={styles.actions}>
          <Button onPress={() => this.props.navigation.navigate('projectSettings')}>
            <View style={styles.action}>
              <Icon type="material" name="view-module" size={iconSize} />
              <Text>Change project</Text>
            </View>
          </Button>
          <View style={styles.action}>
            {this.props.lastSuccessfulSync &&
              <Text style={styles.lastSyncText}>
                last {distanceInWordsToNow(this.props.lastSuccessfulSync, { addSuffix: true })}
              </Text>}
            <Button disabled={this.props.isSyncing} onPress={this.refresh}>
              <Animatable.View animation={this.props.isSyncing ? 'rotate' : null} iterationCount="infinite">
                <Icon name="refresh" size={iconSize} />
              </Animatable.View>
            </Button>
          </View>
        </View>
        <Button onPress={() => this.props.navigation.navigate('summary')}>
          <Text style={styles.projectTitle}>{project.name}</Text>
        </Button>
      </View>
    );
  }
}

type PropsType = {
  fetchBaseData: Function,
  project: ?ProjectType,
  lastSuccessfulSync: ?Date,
  isSyncing: boolean,
  navigation: any,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: STATUSBAR_HEIGHT + 5,
    paddingBottom: 5,
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastSyncText: {
    color: '#666',
    fontSize: 11,
    marginRight: 5,
  },
  projectTitle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '300',
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
