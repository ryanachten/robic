import * as React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-elements";
import {
  VictoryAxis,
  VictoryBar,
  VictoryGroup,
  VictoryLabel,
  VictoryTooltip
} from "victory-native";

export class ExerciseSessionChart extends React.Component {
  public state = {
    setCount: null,
    totalReps: null,
    totalValue: null,
    sessionValue: null
  };

  public componentDidMount() {
    const { personBest, sessions } = this.props;
    const {
      highestValue,
      highestNetValue,
      highestTotalReps,
      highestSetCount
    } = personBest;

    const setCount = sessions.map((session, index) => {
      if (index > 8) return;
      return {
        date: session.date,
        setCount: session.sets.length,
        y: session.sets.length / highestSetCount
      };
    });

    const totalReps = sessions.map(session => {
      let total = 0;
      session.sets.map(set => {
        total += set.reps;
      });
      return {
        date: session.date,
        reps: total,
        y: total / highestTotalReps
      };
    });

    const sessionValue = sessions.map(session => {
      let _highestSessionValue = 0;
      session.sets.map(set => {
        if (set.value > _highestSessionValue) _highestSessionValue = set.value;
      });
      return {
        date: session.date,
        value: _highestSessionValue,
        y: _highestSessionValue / highestValue
      };
    });

    const totalValue = sessions.map(session => {
      return {
        date: session.date,
        value: session.netWeight,
        y: session.netWeight / highestNetValue
      };
    });

    this.setState({
      setCount,
      totalReps,
      totalValue,
      sessionValue
    });
  }

  public render() {
    const { setCount, totalReps, totalValue, sessionValue } = this.state;
    const { personBest, sessions } = this.props;
    const {
      highestSessionValue,
      highestSetCount,
      highestNetValue,
      highestTotalReps
    } = personBest;

    return (
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <VictoryGroup offset={10} colorScale={"qualitative"} height={300}>
          <VictoryBar
            height={300}
            data={sessionValue}
            labelComponent={<VictoryTooltip />}
            labels={d => `${d.date} - ${d.value}`}
          />
          <VictoryBar
            height={300}
            data={totalReps}
            labelComponent={<VictoryTooltip />}
            labels={d => `${d.date} - ${d.reps}`}
          />
          <VictoryBar
            height={300}
            data={totalValue}
            labelComponent={<VictoryTooltip />}
            labels={d => `${d.date} - ${d.value}`}
          />
        </VictoryGroup>
        <View>
          <VictoryAxis
            style={{
              axis: { stroke: "red" }
            }}
            tickValues={sessions.map(session => session.date)}
          />
        </View>
      </View>
    );
  }
}

/*

<VictoryAxis
  style={{
    axis: { stroke: "red" }
  }}
  tickValues={sessions.map(session => session.date)}
/>

*/
