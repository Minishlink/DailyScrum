// TODO handle everything else than Analytics (probably use firebase node module)

class GoogleAnalytics {
  static logEvent(event: string, params?: Object = {}) {
    window.ga('send', 'event', params.category || 'log', event, params.label, params.value);
  }

  static setCurrentScreen(screenName: string) {
    window.ga('set', 'page', screenName);
    window.ga('send', 'pageview');
  }

  static setUserId(userId: string) {
    window.ga('set', 'userId', userId);
  }

  static setUserProperty(property: string, value: string) {
    // TODO handle multiple properties
    window.ga('set', 'dimension1', value);
  }
}

export default {
  initializeApp: () => ({
    analytics: () => GoogleAnalytics,
  }),
};
