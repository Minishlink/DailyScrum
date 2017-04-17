# Deployment

## Configuration
In the `fastlane` folder, copy the `.env.envName.secret.dist` file for each environment you want to deploy to,
and rename each file by replacing `envName` with the environment name (eg. `.env.staging.secret`). Replace values
inside with the real ones.

## Staging
If you want to deploy to [HockeyApp](https://rink.hockeyapp.net/manage/dashboard), you can do it with:
```bash
yarn deploy:staging         # both Android and iOS
yarn deploy:staging:android # only Android
yarn deploy:staging:ios     # only iOS
```
