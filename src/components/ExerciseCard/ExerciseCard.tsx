import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-elements';

interface IProps {
  date: string;
  lastSession?: object;
  personalBest?: object;
  title: string;
}

export class ExerciseCard extends React.Component {

  public renderLastSession() {
    const lastSession = this.props.lastSession;
    if (!lastSession) return null;

    const reps = lastSession.reps;
    const sets = lastSession.sets;
    return (
      <Text style={styles.textWrapper}>
        <Text style={styles.textLabel}>Last session: </Text>
        <Text>{reps} reps</Text>
        <Text>{sets} sets</Text>
      </Text>
    );
  }

  public renderPersonalBest() {
    const personalBest = this.props.personalBest;
    if (!personalBest) return null;

    const reps = personalBest.reps;
    const sets = personalBest.sets;
    return (
      <Text style={styles.textWrapper}>
        <Text style={styles.textLabel}>Personal best: </Text>
        <Text>{reps} reps</Text>
        <Text>{sets} sets</Text>
      </Text>
    );
  }

  public render() {
    const { title, date, onPress } = this.props;
    return (
        <TouchableOpacity onPress={onPress}>
          <Card>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.textWrapper}>
              <Text style={styles.textLabel}>Last active: </Text>
            </Text>
            { this.renderLastSession() }
            { this.renderPersonalBest() }
          </Card>
        </TouchableOpacity>
    );
  }
}

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
