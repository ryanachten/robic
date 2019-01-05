import { SecureStore } from "expo";
import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import ApolloClient from "../../ApolloClient";
import NavigationService from "../../navigation/NavigationService";

export class LogOutButton extends React.Component {
  public async logOut() {
    await SecureStore.deleteItemAsync("token");
    // TODO: should probably be clearing cache here (to prevent users accessing other user data) via ApolloClient.resetStore() - need data to test this out properly though
    NavigationService.navigate("Login");
  }

  public render() {
    return (
      <TouchableOpacity onPress={() => this.logOut()} style={styles.button}>
        <Text>Log out</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginRight: 20
  }
});
