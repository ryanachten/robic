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
      lowestValue: 99,
      lineData: []
    };
  }

  public componentDidMount() {
    const exercises = this.props.exercises;

    // Yeah, I mean not great, but for some reason I can't use setState inside of the following map statement
    let lowestOverallValue = 100;
    const lineData = exercises.map((exercise, index) => {
      const { line, lowestLineValue } = this.getLineData(exercise, index);
      if (lowestOverallValue > lowestLineValue) {
        lowestOverallValue = lowestLineValue;
      }
      return line;
    });
    this.setState({
      lineData,
      lowestValue: lowestOverallValue
    });
  }

  public getLineData(exercise: object, index: int) {
    const { title, highestNetValue, recentSessions } = exercise;
    const { lowestValue, totalNumberOfExercises } = this.state;

    const colour = `hsl(${(255 / totalNumberOfExercises) * index}, 100%, 50%)`;

    let lowestLineValue = 100;
    const sessionGraphData = recentSessions.map(session => {
      // normalisedPercent = ( netWeight or record / lowest netWeight or record ) * 100;
      const normalisedPercent = (session.value / highestNetValue) * 100;
      if (lowestLineValue > normalisedPercent) {
        lowestLineValue = normalisedPercent;
      }
      return {
        title,
        x: session.date,
        y: normalisedPercent
      };
    });
    return {
      line: {
        title,
        colour,
        data: sessionGraphData
      },
      lowestLineValue
    };
  }

  public renderLines(line: object) {
    const { title, colour, data } = line;
    return (
      <VictoryLine
        key={title}
        style={{
          data: { stroke: colour },
          labels: { fill: colour }
        }}
        data={data}
      />
    );
  }

  public render() {
    const { lowestValue, lineData } = this.state;
    return (
      <VictoryChart
        scale={{ x: "time", y: "linear" }}
        domain={{ y: [lowestValue, 100] }}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={d => `${d.title}: ${d.y.toFixed(2)}`}
          />
        }
      >
        {lineData.map(line => this.renderLines(line))}
      </VictoryChart>
    );
  }
}
