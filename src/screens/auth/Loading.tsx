import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "react-apollo";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

class Loading extends React.Component {
  public static navigationOptions = {
    header: null
  };

  public componentDidUpdate() {
    const currentUser = this.props.data.currentUser;
    // If user is already logged in, navigate them to the activity screen
    if (currentUser) {
      this.props.navigation.navigate("main");
    }
    // If user is not logged in, navigate them to login screen
    if (currentUser === null) {
      this.props.navigation.navigate("Login");
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Robic is loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  text: {
    marginBottom: 20
  }
});

const query = gql`
  {
    currentUser {
      id
      email
      firstName
      lastName
    }
  }
`;

export default graphql(query)(Loading);
