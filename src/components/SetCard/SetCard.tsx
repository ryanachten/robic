import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, FormInput, Text } from 'react-native-elements';
import { IconButton } from '..';

export const SetCard = (props) => {
  const { reps, value, unit } = props;
  return (
    <Card wrapperStyle={styles.container}>
      <View style={styles.section}>
        <FormInput
          containerStyle={styles.input}
          placeholder="value"
          value={value}
        />
        <Text style={styles.unit}>
          {unit}
        </Text>
      </View>
      <View style={styles.section}>
        <FormInput
          containerStyle={styles.input}
          placeholder="reps"
          value={reps}
        />
        <Text style={styles.unit}>
          reps
        </Text>
      </View>
      <IconButton
        color="red"
        name="remove"
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
  section: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  unit: {
    flex: 1,
    fontSize: 16,
  },
});
