import * as React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-elements";
import { VictoryBar, VictoryGroup, VictoryTooltip } from "victory-native";

export class ExerciseSessionChart extends React.Component {
  public state = {
    setCount: null,
    totalReps: null,
    totalValue: null
  };

  public componentDidMount() {
    const { personBest, sessions } = this.props;
    const { highestSetCount, highestNetValue, highestTotalReps } = personBest;

    const setCount = sessions.map(session => {
      return {
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
        reps: total,
        y: total / highestTotalReps
      };
    });

    const totalValue = sessions.map(session => {
      return {
        value: session.netWeight,
        y: session.netWeight / highestNetValue
      };
    });

    this.setState({
      setCount,
      totalReps,
      totalValue
    });
  }

  public render() {
    const { setCount, totalReps, totalValue } = this.state;
    const {
      highestSetCount,
      highestNetValue,
      highestTotalReps
    } = this.props.personBest;

    return (
      <View>
        <VictoryGroup offset={20} colorScale={"qualitative"}>
          <VictoryBar
            data={setCount}
            labelComponent={<VictoryTooltip />}
            labels={d => d.setCount}
          />
          <VictoryBar
            data={totalReps}
            labelComponent={<VictoryTooltip />}
            labels={d => d.reps}
          />
          <VictoryBar
            data={totalValue}
            labelComponent={<VictoryTooltip />}
            labels={d => d.value}
          />
        </VictoryGroup>
      </View>
    );
  }
}
