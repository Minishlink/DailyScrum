// @flow
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { distanceInWordsToNow } from 'date-fns';
import { Text, Icon, Button, Gradient } from '../components';
import { fetchBaseData } from '../modules/common';
import { isSyncingSelector } from '../modules/sync';
import { lastSuccessfulSyncDateSelector } from '../modules/common/reducer';
import type { UserType } from '../types';
import appStyle, { STATUSBAR_HEIGHT } from '../appStyle';
import { Analytics } from '../services';
import createErrorBar from './ErrorBar';
import { currentUserSelector } from '../modules/users/reducer';
import MemberIcon from './TrelloCard/MemberIcon';
import { isDrawerOpenSelector } from '../modules/navigation/reducer';
import { logout } from '../modules/auth';
const ErrorBar = createErrorBar();

class Drawer extends Component {
  props: PropsType;

  shouldComponentUpdate(nextProps: PropsType) {
    return (
      this.props.isSyncing !== nextProps.isSyncing || this.props.lastSuccessfulSync !== nextProps.lastSuccessfulSync
    );
  }

  goToProjectSettings = () => this.props.navigation.navigate('projectSettings');

  sync = () => {
    Analytics.logEvent('sync_trigger'); // are users using this sync button?
    this.props.fetchBaseData();
  };

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        {this.props.isDrawerOpen && <ErrorBar style={styles.errorBar} />}
        {user &&
          <Gradient style={styles.profile}>
            <MemberIcon member={user} size={84} />
            <Text style={styles.fullName}>
              {user.fullName}
            </Text>
          </Gradient>}
        <View style={[styles.actions, styles.mainActions]}>
          <Button
            disabled={this.props.isSyncing}
            onPress={this.sync}
            hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}
          >
            <View style={styles.action}>
              <Animatable.View
                animation={this.props.isSyncing ? 'rotate' : null}
                iterationCount="infinite"
                useNativeDriver
              >
                <Icon name="refresh" size={17} color={appStyle.colors.warmGray} />
              </Animatable.View>
              <Text style={[styles.lastSyncText, styles.actionText]}>
                {this.props.lastSuccessfulSync
                  ? `Last full sync ${distanceInWordsToNow(this.props.lastSuccessfulSync, { addSuffix: true })}`
                  : 'Synchronize now'}
              </Text>
            </View>
          </Button>
          <Button
            onPress={this.goToProjectSettings}
            style={styles.addProjectButtonContainer}
            hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}
          >
            <View style={styles.addProjectButton}>
              <Text style={styles.addProjectButtonText}>CHANGE PROJECT</Text>
            </View>
          </Button>
        </View>
        <View style={styles.actions}>
          <Button onPress={this.props.logout} hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}>
            <View style={styles.action}>
              <Icon name="logout-variant" type="material-community" size={20} color={appStyle.colors.text} />
              <Text style={styles.actionText}>Log out</Text>
            </View>
          </Button>
        </View>
      </View>
    );
  }
}

type PropsType = {
  fetchBaseData: Function,
  user: ?UserType,
  lastSuccessfulSync: ?Date,
  isSyncing: boolean,
  isDrawerOpen: boolean,
  logout: Function,
  navigation: any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorBar: {
    paddingTop: STATUSBAR_HEIGHT,
  },
  profile: {
    paddingTop: 31 + STATUSBAR_HEIGHT,
    paddingBottom: 28,
    alignItems: 'center',
  },
  fullName: {
    marginTop: 14,
    color: appStyle.colors.overPrimaryColor,
  },
  mainActions: {
    flex: 1,
  },
  actions: {
    padding: 20,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: appStyle.margin,
  },
  lastSyncText: {
    color: appStyle.colors.warmGray,
  },
  addProjectButtonContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  addProjectButton: {
    height: 40,
    justifyContent: 'center',
    borderRadius: appStyle.borderRadius,
    backgroundColor: appStyle.colors.tertiary,
  },
  addProjectButtonText: {
    color: appStyle.colors.overPrimaryColor,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  user: currentUserSelector(state),
  lastSuccessfulSync: lastSuccessfulSyncDateSelector(state),
  isSyncing: isSyncingSelector(state, 'common', 'base'),
  isDrawerOpen: isDrawerOpenSelector(state),
});

const mapDispatchToProps = {
  fetchBaseData,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
