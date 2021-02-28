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
  interval: NodeJS.Timeout | null;
  initState: State = {
    started: false,
    msec: 0,
    sec: 0,
    min: 0,
  };
  constructor(props: Props) {
    super(props);
    this.interval = null;
    this.state = {
      ...this.initState,
    };

    AppState.addEventListener("change", (nextAppState) =>
      this.handleAppStateChange(nextAppState)
    );
  }

  start() {
    this.interval = setInterval(() => this.step(), 1);
    this.setState({
      started: true,
    });
  }

  getTime() {
    return this.state;
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setState({
      started: false,
    });
  }

  step() {
    let { msec, sec, min } = this.state;
    if (msec !== 99) {
      msec += 1;
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
    const currentState = AppState.currentState;

    if (nextAppState === "active") {
      this.handleForeground();
    }

    if (
      currentState.match("active") &&
      (nextAppState === "inactive" || nextAppState === "background")
    ) {
      this.handleBackground();
    }
  }

  handleBackground() {
    this.stop();
    AsyncStorage.setItem(StorageKeys.StopwatchInactive, Date.now().toString());
  }

  async handleForeground() {
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
