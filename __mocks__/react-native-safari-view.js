jest.mock('react-native-safari-view', () => ({
  dismiss: () => null,
  show: () => null,
  isAvailable: Promise.resolve,
}));
