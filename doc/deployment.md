# Deployment
Thanks to CodePush, we can deploy a new version of the app when no native code has been updated.

## If you're a collaborator
If you do native code modifications, please notify a release manager and ask him to deploy. (TODO Bitrise job)

### Configuration
```bash
yarn global add code-push-cli
code-push register
# ask to be added as a collaborator on the project
```

### Deploy with CodePush
```
yarn deploy         # both Android and iOS
yarn deploy:android # only Android
yarn deploy:ios     # only iOS
```
This will land on staging (HockeyApp).
If the modifications look good, ask a release manager to promote them
from the Staging environment to the Production one.

## If you're a maintainer or release manager
As a release manager, you will deploy versions with native changes and deploy to production.
For regular updates without changes to the native code, please follow the "collaborator" part.

### Configuration
In the `fastlane` folder, copy the `.env.envName.secret.dist` file for each environment you want to deploy to,
and rename each file by replacing `envName` with the environment name (eg. `.env.staging.secret`). Replace values
inside with the real ones.

Have corresponding keystores in `android/app`.
Create them with `keytool -genkey -v -keystore dailyscrum.envName.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias dailyscrum`.

### Staging
Please bump the app version (`APP_VERSION_CODE`, `APP_VERSION_NAME`) in `fastlane/.env` if necessary.

The following commands will deploy to [HockeyApp](https://rink.hockeyapp.net/manage/dashboard):
```bash
yarn deploy:staging         # both Android and iOS
yarn deploy:staging:android # only Android
yarn deploy:staging:ios     # only iOS
```

### Production
Please bump the app version (`APP_VERSION_CODE`, `APP_VERSION_NAME`) in `fastlane/.env` if necessary.

The following commands will deploy to TestFlight and Android Beta.
```bash
yarn deploy:prod         # both Android and iOS
yarn deploy:prod:android # only Android
yarn deploy:prod:ios     # only iOS
```
