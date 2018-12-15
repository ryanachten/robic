import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-elements';

export const ScreenHeader = ({ children }) => (
  <Text style={styles.text}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
});
