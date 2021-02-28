// Based on https://codersera.com/blog/first-react-native-app-stopwatch/ implementation

import React, { Component } from "react";
import { View, StyleSheet, AppState, AppStateStatus } from "react-native";
import { Colors } from "../constants/Colors";
import { Text } from "@ui-kitten/components";
import { Button } from "./Button";
import AsyncStorage from "@react-native-community/async-storage";
import { StorageKeys } from "../constants/StorageKeys";
import { differenceInMilliseconds } from "date-fns";

let padToTwo = (number: number) => (number <= 9 ? `0${number}` : number);

type Props = {};

type State = {
  started: Boolean;
  msec: number;
  sec: number;
  min: number;
};

export class Stopwatch extends Component<Props, State> {
  animationRequest: number | null;
  framesPerMillisecond: number;
  fpsInterval: number;
  then: number;
  startTime: number;
  initState: State = {
    started: false,
    msec: 0,
    sec: 0,
    min: 0,
  };
  constructor(props: Props) {
    super(props);
    this.animationRequest = null;
    this.framesPerMillisecond = 1000;
    this.fpsInterval = this.framesPerMillisecond;
    this.then = Date.now();
    this.startTime = this.then;
    this.state = {
      ...this.initState,
    };

    AppState.addEventListener("change", (nextAppState) =>
      this.handleAppStateChange(nextAppState)
    );
  }

  componentWillUnmount() {
    this.stop();
    AppState.removeEventListener("change", (nextAppState) =>
      this.handleAppStateChange(nextAppState)
    );
  }

  start() {
    this.animate();
    this.setState({
      started: true,
    });
  }

  animate() {
    this.animationRequest = requestAnimationFrame(() => this.animate());

    const now = Date.now();
    const elapsed = now - this.then;

    if (elapsed > this.fpsInterval) {
      this.then = now - (elapsed % this.fpsInterval);
      this.step();
    }
  }

  getTime() {
    return this.state;
  }

  stop() {
    if (this.animationRequest) {
      cancelAnimationFrame(this.animationRequest);
    }
    this.setState({
      started: false,
    });
  }

  step() {
    let { msec, sec, min } = this.state;
    if (msec < 100 - this.framesPerMillisecond) {
      msec += this.framesPerMillisecond;
    } else if (sec !== 59) {
      msec = 0;
      sec += 1;
    } else {
      msec = 0;
      sec = 0;
      min += 1;
    }
    this.setState({
      msec,
      sec,
      min,
    });
  }

  handleReset() {
    this.stop();
    this.setState({ ...this.initState });
  }

  handleAppStateChange(nextAppState: AppStateStatus) {
    if (nextAppState === "active") {
      this.handleForeground();
    }

    if (nextAppState === "inactive" || nextAppState === "background") {
      this.handleBackground();
    }
  }

  handleBackground() {
    this.stop();

    AsyncStorage.setItem(StorageKeys.StopwatchInactive, Date.now().toString());
  }

  async handleForeground() {
    this.stop();
    const cachedTimeStamp = await AsyncStorage.getItem(
      StorageKeys.StopwatchInactive
    );

    if (!cachedTimeStamp) return;

    const relativeMillis = differenceInMilliseconds(
      Date.now(),
      parseInt(cachedTimeStamp)
    );
    const elapsedMins = Math.floor(relativeMillis / 60000);
    const elapsedSeconds = parseFloat(
      ((relativeMillis % 60000) / 1000).toFixed(0)
    );
    this.setState((prevState) => ({
      min: prevState.min + elapsedMins,
      sec: prevState.sec + elapsedSeconds,
    }));
    this.start();
  }

  render() {
    const { started, msec, sec, min } = this.state;
    return (
      <View>
        <View style={styles.parent}>
          <Text style={styles.child}>{padToTwo(min) + " : "}</Text>
          <Text style={styles.child}>{padToTwo(sec) + " : "}</Text>
          <Text style={styles.child}>{padToTwo(msec)}</Text>
        </View>
        <View style={styles.buttonParent}>
          <Button appearance="ghost" onPress={() => this.handleReset()}>
            Reset
          </Button>
          <Button
            appearance="ghost"
            onPress={() => (started ? this.stop() : this.start())}
          >
            {!started ? "Start" : "Stop"}
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    width: 200,
  },
  child: {
    fontSize: 40,
  },
  buttonParent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonText: {
    color: Colors.orange,
    fontSize: 20,
    alignSelf: "center",
  },
});
