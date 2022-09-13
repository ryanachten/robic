## Application Development

### Running Robic

- Install Node, Yarn and Expo CLI
- Run `yarn start` and select target platform (iOS and Android actively maintained)
- See instructions in the [API README](../api/README.md) for running against the API running locally

### Submitting to App Store

**Note:** only Android has been configured for the time-being. Will evaluate later whether iOS support should be investigated. 

#### EAS setup
- Install Expo Application Services - `npm install -g eas-cli`
- Create Google Play Console Developer Service Account JSON Key [see here](https://github.com/expo/fyi/blob/main/creating-google-service-account.md)
- Login into Expo Application Services `eas login` using Expo Developer credentials

#### New app version submission
- Increment app version numbers in `app.json`
- Run build for specific platform `eas build --platform android`
- Submit build for specific platform `eas submit -p android`
- Once submitted successfully, the app will be available on Google App Store via internal testing track
  - Once internal testing has been completed, release can be promoted to production  