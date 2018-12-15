import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

interface IProps {
  children: React.ReactNode;
}

export const ScreenHeader = (props: IProps) => {
  const children = props.children;
  return (
    <Text style={styles.text}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
});
