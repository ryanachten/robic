import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button as RNEButton } from 'react-native-elements';

export const Button = (props) => {
  const { iconName, title, containerStyle } = props;
  return (
    <RNEButton
      buttonStyle={styles.button}
      containerViewStyle={containerStyle}
      icon={{
        color: 'black',
        name: iconName,
      }}
      raised
      textStyle={styles.text}
      title={title}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
});
