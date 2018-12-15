import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button as RNEButton } from 'react-native-elements';

export const Button = (props) => {
  const { containerStyle, iconName, title, onPress } = props;
  return (
    <RNEButton
      buttonStyle={styles.button}
      containerViewStyle={containerStyle}
      icon={{
        color: 'black',
        name: iconName,
      }}
      onPress={onPress}
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
