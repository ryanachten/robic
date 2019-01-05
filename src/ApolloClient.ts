import ApolloClient from "apollo-boost";
import { SecureStore } from "expo";

const client = new ApolloClient({
  // uri: "https://robic-server.herokuapp.com/graphql",
  uri: "http://localhost:4000/graphql",
  request: async operation => {
    const token = await SecureStore.getItemAsync("token");
    console.log("retrieved token", token);
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  }
});

export default client;
