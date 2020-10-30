// Based on https://codersera.com/blog/first-react-native-app-stopwatch/ implementation

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Margin } from "../constants/Sizes";
import { useInterval } from "../hooks/useInterval";
import { Text } from "./Themed";

type Lap = { min: number; sec: number; msec: number };

let padToTwo = (number: number) => (number <= 9 ? `0${number}` : number);

type StopwatchHandle = {
  handleReset: () => void;
  getTime: () => { min: number; sec: number; msec: number };
  hasStarted: () => boolean;
};

export const Stopwatch = forwardRef<StopwatchHandle, {}>((props, ref) => {
  // Stopwatch state
  const [start, setStart] = useState(false);
  const [msec, setMilliSec] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [laps, setLaps] = useState<Array<Lap>>([]);

  const handleToggle = () => {
    setStart(!start);
  };

  const handleLap = (min: number, sec: number, msec: number) => {
    setLaps([...laps, { min, sec, msec }]);
  };

  useInterval(() => {
    if (start) {
      if (msec !== 99) {
        setMilliSec(msec + 1);
      } else if (sec !== 59) {
        setMilliSec(0);
        setSec(sec + 1);
      } else {
        setMilliSec(0);
        setSec(0);
        setMin(min + 1);
      }
    }
  }, 1);

  const hasStarted = () => msec !== 0 || sec !== 0 || min !== 0;

  const handleReset = () => {
    setMilliSec(0);
    setSec(0);
    setMin(0);
    setStart(false);
    setLaps([]);
  };

  const getTime = () => ({ msec, sec, min });

  // Expose following functions to parent via ref
  useImperativeHandle(ref, () => ({
    handleReset,
    getTime,
    hasStarted,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.parent}>
        <Text style={styles.child}>{padToTwo(min) + " : "}</Text>
        <Text style={styles.child}>{padToTwo(sec) + " : "}</Text>
        <Text style={styles.child}>{padToTwo(msec)}</Text>
      </View>
      <View style={styles.buttonParent}>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggle}>
          <Text style={styles.buttonText}>{!start ? "Start" : "Stop"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: Margin.md,
  },
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
    fontSize: 20,
    alignSelf: "center",
  },
});
