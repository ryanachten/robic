import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export const IconButton = (props) => {
  const { color, name, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon
        color={color}
        containerStyle={styles.container}
        iconStyle={styles.icon}
        name={name}
        raised
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
  },
});
