// Based on https://codersera.com/blog/first-react-native-app-stopwatch/ implementation

import React, { Component } from "react";
import { View, StyleSheet, AppState, AppStateStatus } from "react-native";
import { Colors } from "../constants/Colors";
import { Text } from "@ui-kitten/components";
import AsyncStorage from "@react-native-community/async-storage";
import { StorageKeys } from "../constants/StorageKeys";
import { differenceInMilliseconds } from "date-fns";
import { Icon } from "./Icon";
import { Margin } from "../constants/Sizes";

let padToTwo = (number: number) => (number <= 9 ? `0${number}` : number);

type Props = {};

type State = {
  started: Boolean;
  msec: number;
  sec: number;
  min: number;
  shouldRestoreStopwatch: Boolean;
};

export class Stopwatch extends Component<Props, State> {
  animationRequest: number | null;
  framesPerMillisecond: number;
  fpsInterval: number;
  then: number;
  startTime: number;
  initState: State = {
    shouldRestoreStopwatch: false,
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
    } else if (sec < 59) {
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
    if (this.state.started) {
      this.stop();
      AsyncStorage.setItem(
        StorageKeys.StopwatchInactive,
        Date.now().toString()
      );
      this.setState({
        shouldRestoreStopwatch: true,
      });
    }
  }

  async handleForeground() {
    const { shouldRestoreStopwatch } = this.state;
    const cachedTimeStamp = await AsyncStorage.getItem(
      StorageKeys.StopwatchInactive
    );

    if (!shouldRestoreStopwatch || !cachedTimeStamp) return;

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
      shouldRestoreStopwatch: false,
    }));
    AsyncStorage.removeItem(StorageKeys.StopwatchInactive);
    this.start();
  }

  render() {
    const { started, msec, sec, min } = this.state;
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{padToTwo(min) + " : "}</Text>
            <Text style={styles.text}>{padToTwo(sec)}</Text>
            {/* <Text style={styles.child}>{padToTwo(sec) + " : "}</Text>
          <Text style={styles.child}>{padToTwo(msec)}</Text> */}
          </View>
          <Icon
            name={!started ? "play-circle-outline" : "stop-circle-outline"}
            size="md"
            fill={Colors.orange}
            style={styles.playIcon}
            onPress={() => (started ? this.stop() : this.start())}
          />
          <Icon
            name="refresh-outline"
            size="md"
            fill={Colors.orange}
            onPress={() => this.handleReset()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: Margin.md,
  },
  playIcon: {
    marginRight: Margin.md,
  },
  textWrapper: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    marginRight: Margin.lg,
    width: 120,
  },
  text: {
    fontSize: 40,
  },
});
