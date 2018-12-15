import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-elements';

interface IProps {
  date: string;
  excerciseCount: number;
  title: string;
}

export const SessionCard = (props: IProps) => {
  const { title, date, excerciseCount } = props;
  return (
    <Card>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.textWrapper}>
        <Text style={styles.textLabel}>Last active: </Text>
        <Text>{date}</Text>
      </Text>
      <Text style={styles.textWrapper}>
        <Text style={styles.textLabel}>Number of exercises: </Text>
        <Text>{excerciseCount}</Text>
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  textLabel: {
    fontWeight: 'bold',
    marginRight: 20,
  },
  textWrapper: {
    fontSize: 12,
    textAlign: 'center',
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
});
