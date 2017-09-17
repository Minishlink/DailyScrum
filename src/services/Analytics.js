// @flow
import RNFirebase from 'react-native-firebase';
import type { UserType } from '../types/Team';

let firebase = null;

if (!__DEV__) {
  firebase = RNFirebase.initializeApp({
    errorOnMissingPlayServices: false,
  });
}

export const setUser = (user: UserType) => {
  if (!firebase) return;
  firebase.analytics().setUserId(user.id);
  firebase.analytics().setUserProperty('role', user.role);
};

export const setCurrentScreen = (screenName: string) => {
  if (!firebase) return;
  firebase.analytics().setCurrentScreen(screenName);
};

export const logEvent = (event: string, params?: Object) => {
  if (!firebase) return;
  firebase.analytics().logEvent(event, params);
};
