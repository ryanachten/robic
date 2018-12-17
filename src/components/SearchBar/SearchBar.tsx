import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar as RNESearchBar } from 'react-native-elements';

export const SearchBar = (props) => {
  const { placeholder } = props;
  return (
    <RNESearchBar
      lightTheme
      containerStyle={styles.container}
      icon={{ type: 'material', color: 'black', name: 'search' }}
      inputStyle={styles.input}
      placeholder={placeholder}
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
