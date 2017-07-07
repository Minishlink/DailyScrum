#!/usr/bin/env bash
set -e

FORCE=0
ANDROID=0
IOS=0

for i in "$@"
do
case $i in
  -f|--force)
  FORCE=1
  shift
  ;;
  -a|--android)
  ANDROID=1
  shift
  ;;
  -i|--ios)
  IOS=1
  shift
  ;;
  *)
  # unknown option
  ;;
esac
done

echo "Deploying to CodePush"

if [ $FORCE = 0 ]; then
  git stash
  git checkout staging
  git pull
else
  RED='\033[0;31m'
  NC='\033[0m'
  echo -e "${RED}/!\ Forcing update with your current local files /!\ \nHere's your 'git status', abort (CTRL+C) if you think this was an error. ${NC}"
  git status --short --branch
fi

source fastlane/.env.staging

LAST_GIT_COMMIT=$(git log HEAD --pretty=format:"%s" -1)
read -e -p "What's the changelog? (leave empty for \"$LAST_GIT_COMMIT\") " INPUT_CHANGELOG
MESSAGE="${INPUT_CHANGELOG:-$LAST_GIT_COMMIT}"

yarn

if [ $ANDROID = 1 ]; then
  echo "Targeting $ENV Android app version $ANDROID_VERSION_NAME"
  code-push release-react -d Staging DailyScrum-Android android -m  -o dist/android-maps --targetBinaryVersion $ANDROID_VERSION_NAME --des "$MESSAGE"
fi

if [ $IOS = 1 ]; then
  echo "Targeting $ENV iOS app version $IOS_VERSION"
  code-push release-react -d Staging DailyScrum-iOS ios -m -o dist/ios-maps --targetBinaryVersion $IOS_VERSION --des "$MESSAGE"
fi
