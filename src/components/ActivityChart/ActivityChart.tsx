import * as React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer
} from "victory-native";

/*
  Charts changes in netWeight / record values over a period of time (6 months?)
*/

export class ActivityChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalNumberOfExercises: props.exercises.length,
      lowestValue: 100
    };
  }

  public renderLines(exercise: object, index: int) {
    const { title, highestNetValue, recentSessions } = exercise;
    const { lowestValue, totalNumberOfExercises } = this.state;

    const colour = `hsl(${(255 / totalNumberOfExercises) * index}, 100%, 50%)`;

    const sessionGraphData = recentSessions.map(session => {
      // normalisedPercent = ( netWeight or record / lowest netWeight or record ) * 100;
      const normalisedPercent = (session.value / highestNetValue) * 100;
      if (lowestValue > normalisedPercent) {
        this.setState({ lowestValue: normalisedPercent });
      }
      return {
        x: session.date,
        y: normalisedPercent
      };
    });
    return (
      <VictoryLine
        key={title}
        style={{
          data: { stroke: colour },
          labels: { fill: colour }
        }}
        data={sessionGraphData}
      />
    );
  }

  public render() {
    const exercises = this.props.exercises;
    const lowestValue = this.state.lowestValue;
    return (
      <VictoryChart
        scale={{ x: "time", y: "linear" }}
        domain={{ y: [lowestValue, 100] }}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={d => `y: ${d.y.toFixed(2)}`}
          />
        }
      >
        {exercises &&
          exercises.map((exercise, index) => this.renderLines(exercise, index))}
      </VictoryChart>
    );
  }
}
