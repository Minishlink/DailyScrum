// fix to override buggy implementation
// https://github.com/facebook/react-native/pull/17820
const DeviceEventManager = require('NativeModules').DeviceEventManager;
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

const DEVICE_BACK_EVENT = 'hardwareBackPress';

type BackPressEventName = $Enum<{
  backPress: string,
}>;

const _backPressSubscriptions = new Set();

setTimeout(() => {
  RCTDeviceEventEmitter.removeAllListeners(DEVICE_BACK_EVENT);
  RCTDeviceEventEmitter.addListener(DEVICE_BACK_EVENT, function() {
    let invokeDefault = true;
    let subscriptions = [];
    _backPressSubscriptions.forEach(subscription => subscriptions.push(subscription));
    subscriptions = subscriptions.reverse();
    for (let i = 0; i < subscriptions.length; ++i) {
      if (subscriptions[i]()) {
        invokeDefault = false;
        break;
      }
    }

    if (invokeDefault) {
      BackHandler.exitApp();
    }
  });
}, 3000);

const BackHandler = {
  exitApp: function() {
    DeviceEventManager.invokeDefaultBackPressHandler();
  },

  addEventListener: function(eventName: BackPressEventName, handler: Function): { remove: () => void } {
    _backPressSubscriptions.add(handler);
    return {
      remove: () => BackHandler.removeEventListener(eventName, handler),
    };
  },

  removeEventListener: function(eventName: BackPressEventName, handler: Function): void {
    _backPressSubscriptions.delete(handler);
  },
};

module.exports = BackHandler;
