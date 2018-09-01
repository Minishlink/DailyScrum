// @flow
import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { DrawerActions } from 'react-navigation';
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
import { logout } from '../modules/auth';
import { AndroidDownload, IOSDownload } from './AppDownload';
const ErrorBar = createErrorBar();

class Drawer extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.isSyncing !== nextProps.isSyncing ||
      this.props.lastSuccessfulSync !== nextProps.lastSuccessfulSync ||
      this.props.navigation.state.isDrawerOpen !== nextProps.navigation.state.isDrawerOpen
    );
  }

  goToSubPage = routeName => {
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
    this.props.navigation.navigate(routeName);
  };

  goToProjectSettings = () => this.goToSubPage('projectSettings');
  goToAbout = () => this.goToSubPage('about');

  sync = () => {
    Analytics.logEvent('sync_trigger'); // are users using this sync button?
    this.props.fetchBaseData();
  };

  renderAppDownloads = () => (
    <Fragment>
      <IOSDownload withIcon containerStyle={styles.action} textStyle={styles.actionText} />
      <AndroidDownload withIcon containerStyle={styles.action} textStyle={styles.actionText} />
    </Fragment>
  );

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        {this.props.navigation.state.isDrawerOpen && <ErrorBar style={styles.errorBar} />}
        {user && (
          <Gradient style={styles.profile}>
            <MemberIcon member={user} size={84} />
            <Text style={styles.fullName}>{user.fullName}</Text>
          </Gradient>
        )}
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
            withRipple
          >
            <View style={styles.addProjectButton}>
              <Text style={styles.addProjectButtonText}>CHANGE PROJECT</Text>
            </View>
          </Button>
        </View>
        <View style={styles.actions}>
          {Platform.OS === 'web' && this.renderAppDownloads()}
          <Button onPress={this.goToAbout} hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}>
            <View style={styles.action}>
              <Icon name="information-outline" type="material-community" size={20} color={appStyle.colors.text} />
              <Text style={styles.actionText}>About</Text>
            </View>
          </Button>
          <Button onPress={this.props.logout} hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}>
            <View style={[styles.action, { marginBottom: undefined }]}>
              <Icon name="logout-variant" type="material-community" size={20} color={appStyle.colors.text} />
              <Text style={styles.actionText}>Log out</Text>
            </View>
          </Button>
        </View>
      </View>
    );
  }
}

type Props = {
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
    marginBottom: appStyle.margin,
  },
  actionText: {
    marginLeft: appStyle.margin,
    flex: 1,
    flexWrap: 'wrap',
  },
  lastSyncText: {
    color: appStyle.colors.warmGray,
  },
  addProjectButtonContainer: {
    margin: 2 * appStyle.margin,
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
});

const mapDispatchToProps = {
  fetchBaseData,
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer);
