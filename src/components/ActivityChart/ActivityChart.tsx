import * as React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer
} from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

/*
  Charts changes in netWeight / record values over a period of time (6 months?)
*/

// normalisedValue = ( highest netWeight or record / lowest netWeight or record );
// valuePercent = normalisedValue * 100;

export const ActivityChart = () => (
  <VictoryChart
    scale={{ x: "time", y: "linear" }}
    domain={{ y: [0, 100] }}
    containerComponent={
      <VictoryVoronoiContainer voronoiDimension="x" labels={d => `y: ${d.y}`} />
    }
  >
    <VictoryLine
      style={{ data: { stroke: "red" }, labels: { fill: "red" } }}
      data={[
        { x: new Date(2010, 9, 2), y: 80 },
        { x: new Date(2010, 10, 2), y: 50 },
        { x: new Date(2010, 11, 2), y: 44 },
        { x: new Date(2010, 12, 2), y: 20 }
      ]}
    />
    <VictoryLine
      data={[
        { x: new Date(2010, 9, 2), y: 60 },
        { x: new Date(2010, 10, 2), y: 20 },
        { x: new Date(2010, 11, 2), y: 64 },
        { x: new Date(2010, 12, 2), y: 20 }
      ]}
    />
    <VictoryLine
      style={{ data: { stroke: "green" }, labels: { fill: "green" } }}
      data={[
        { x: new Date(2010, 9, 2), y: 90 },
        { x: new Date(2010, 10, 2), y: 30 },
        { x: new Date(2010, 11, 2), y: 24 },
        { x: new Date(2010, 12, 2), y: 80 }
      ]}
    />
  </VictoryChart>
);
