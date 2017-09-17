# Setup
## Requirements
Make sure you have installed:
* Git
* XCode
* Android SDK
  * SDK API 23
  * Build tools 25.0.2
* node
  * yarn
  * react-native-cli
* ruby
  * bundler
  * cocoapods

## Installation
```bash
git clone git@github.com:Minishlink/DailyScrum.git
cd DailyScrum
bundle install
yarn
pod repo update
cd ios && pod install && cd ..
```

## Configuration
```bash
cp environment/index.dist.js environment/index.js # replace values with the real ones. `TRELLO_APP_KEY` can be found on your Scrumble server.
cp android/app/google-services.dist.json android/app/google-services.json # if you want to develop on Android
```

And now, you are ready, you can start working! (it's a `react-native run-ios` away)
