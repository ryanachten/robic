// Based on https://codersera.com/blog/first-react-native-app-stopwatch/ implementation

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

type Lap = { min: number; sec: number; msec: number };

type Props = {};

type State = {
  start: boolean;
  min: number;
  sec: number;
  msec: number;
};

let padToTwo = (number: number) => (number <= 9 ? `0${number}` : number);

export class Stopwatch extends React.Component<Props, State> {
  laps: Array<Lap>;
  interval: NodeJS.Timeout | null;

  constructor(props: Props) {
    super(props);
    this.state = {
      start: false,
      min: 0,
      sec: 0,
      msec: 0,
    };

    this.laps = [];

    this.interval = null;
  }

  handleToggle = () => {
    this.setState(
      {
        start: !this.state.start,
      },
      () => this.handleStart()
    );
  };

  handleLap = (min: number, sec: number, msec: number) => {
    this.laps = [...this.laps, { min, sec, msec }];
  };

  handleStart = () => {
    if (this.state.start) {
      this.interval = setInterval(() => {
        if (this.state.msec !== 99) {
          this.setState({
            msec: this.state.msec + 1,
          });
        } else if (this.state.sec !== 59) {
          this.setState({
            msec: 0,
            sec: this.state.sec + 1,
          });
        } else {
          this.setState({
            msec: 0,
            sec: 0,
            min: this.state.min + 1,
          });
        }
      }, 1);
    } else {
      this.interval && clearInterval(this.interval);
    }
  };

  handleReset = () => {
    this.setState({
      min: 0,
      sec: 0,
      msec: 0,

      start: false,
    });

    this.interval && clearInterval(this.interval);

    this.laps = [];
  };

  render() {
    return (
      <View>
        <View style={styles.parent}>
          <Text style={styles.child}>{padToTwo(this.state.min) + ' : '}</Text>
          <Text style={styles.child}>{padToTwo(this.state.sec) + ' : '}</Text>
          <Text style={styles.child}>{padToTwo(this.state.msec)}</Text>
        </View>
        <View style={styles.buttonParent}>
          <TouchableOpacity onPress={this.handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleToggle}>
            <Text style={styles.buttonText}>
              {!this.state.start ? 'Start' : 'Stop'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.handleLap(this.state.min, this.state.sec, this.state.msec)
            }
            disabled={!this.state.start}
          >
            <Text style={styles.buttonText}>Lap</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flexDirection: 'row',
  },

  child: {
    fontSize: 40,
  },

  buttonParent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  buttonText: {
    fontSize: 20,
    alignSelf: 'center',
  },
});
