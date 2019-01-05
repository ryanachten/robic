import ApolloClient from "apollo-boost";
import { AppLoading, Asset, Font, Icon, SecureStore } from "expo";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import AppNavigation from "./navigation/AppNavigation";
import NavigationService from "./navigation/NavigationService";

const client = new ApolloClient({
  // uri: "https://robic-server.herokuapp.com/graphql",
  uri: "http://localhost:4000/graphql",
  request: async operation => {
    const token = await SecureStore.getItemAsync("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  }
});

class App extends React.Component {
  public state = {
    isLoadingComplete: false
  };

  public render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <ApolloProvider client={client}>
        <AppNavigation
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </ApolloProvider>
    );
  }

  private _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // require('./assets/images/robot-dev.png'),
        // require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "Material Icons": require("../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf"),
        MaterialIcons: require("../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf")
        // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      })
    ]);
  };

  private _handleLoadingError = error => {
    window.console.error("Asset loading error", error);
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    // console.warn(error);
  };

  private _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

export default App;
