import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar as RNESearchBar } from 'react-native-elements';

export const SearchBar = () => {
  return (
    <RNESearchBar
      lightTheme
      icon={{ type: 'material', color: 'black', name: 'search' }}
      containerStyle={styles.container}
      inputStyle={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
  },
  input: {
    backgroundColor: 'white',
  },
});
