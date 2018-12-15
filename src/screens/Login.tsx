import * as React from 'react';
import { Text, View } from 'react-native';

class Login extends React.Component {
  public render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Auth!</Text>
      </View>
    );
  }
}

export default Login;
