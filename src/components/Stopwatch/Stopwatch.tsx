// Time functionality via https://codepen.io/_Billy_Brown/pen/dbJeh

import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

export class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      laps: [],
      running: false,
      time: null,
      times: [0, 0, 0]
    };
  }

  public componentDidMount() {
    this.reset();
  }

  public reset() {
    this.setState({
      times: [0, 0, 0]
    });
  }

  public start() {
    let { running, time } = this.state;
    if (!time) time = Date.now();
    if (!running) {
      running = true;
      requestAnimationFrame(this.step.bind(this));
    }
    this.setState({
      time,
      running
    });
  }

  // lap() {
  //   let times = this.times;
  //   li.innerText = this.format(times);
  //   this.results.appendChild(li);
  // }

  public stop() {
    this.setState({
      running: false,
      time: null
    });
  }

  public restart() {
    let { running, time } = this.state;
    if (!time) time = Date.now();
    if (!running) {
      running = true;
      requestAnimationFrame(this.step.bind(this));
    }
    this.setState({
      time,
      running
    });
    this.reset();
  }

  public step(timestamp) {
    if (!this.state.running) return;
    this.calculate(timestamp);
    this.setState({
      time: timestamp
    });
    requestAnimationFrame(this.step.bind(this));
  }

  public calculate(timestamp) {
    const { time, times } = this.state;
    const diff = timestamp - time;
    // Hundredths of a second are 100 ms
    times[2] += diff / 10;
    // Seconds are 100 hundredths of a second
    if (times[2] >= 100) {
      times[1] += 1;
      times[2] -= 100;
    }
    // Minutes are 60 seconds
    if (times[1] >= 60) {
      times[0] += 1;
      times[1] -= 60;
    }
    this.setState({
      times
    });
  }

  public getTime() {
    return this.state.times;
  }

  public render() {
    const times = this.state.times;
    return (
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{`${pad0(times[0], 2)}:`}</Text>
        <Text style={styles.text}>{`${pad0(times[1], 2)}:`}</Text>
        <Text style={styles.text}>{`${pad0(Math.floor(times[2]), 2)}`}</Text>
      </View>
    );
  }
}

function pad0(value, count) {
  let result = value.toString();
  for (; result.length < count; --count) result = "0" + result;
  return result;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  textWrapper: {
    alignSelf: "center",
    flexDirection: "row"
  }
});
