jest.mock('react-native-code-push', () => {
  const CodePush = () => RootComponent => RootComponent;
  CodePush.getUpdateMetadata = () => Promise.resolve();
  return CodePush;
});
