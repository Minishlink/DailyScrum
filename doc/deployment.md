# Deployment

## Staging

Updates are deployed automatically (app+web) when a push is made on `master`. For the app, it is sent:
- to HockeyApp if the commit contains `[native]`
- else to CodePush

## Production

Updates are deployed automatically to TestFlight and web when a version is released (tag `v*`).
Android should be done manually with `bundle exec fastlane android deploy --env=prod`.
Updates to production CodePush can be triggered with Bitrise.
