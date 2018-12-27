import * as React from "react";
import { ScrollView, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { ExerciseSessionCard, ExerciseSessionChart } from "../../components";
import exercises from "../../mock_data/exercises";

class Exercise extends React.Component {
  public static navigationOptions = ({ navigation }) => {
    const exerciseTitle = navigation.state.params.exerciseTitle;
    return {
      title: exerciseTitle ? exerciseTitle : "Exercise"
    };
  };

  public state = {
    title: "",
    unit: "kg",
    personBest: {
      highestSetCount: 5,
      highestTotalReps: 25,
      highestValue: 90,
      highestNetValue: 75 * 5 * 5
    },
    history: [
      {
        date: "03/10/2018",
        netWeight: 72.5 * 4 * 5,
        sets: [
          { reps: 4, value: 72.5 },
          { reps: 4, value: 72.5 },
          { reps: 4, value: 72.5 },
          { reps: 4, value: 72.5 },
          { reps: 4, value: 72.5 }
        ]
      },
      {
        date: "04/10/2018",
        netWeight: 72.5 * 5 * 5,
        sets: [
          { reps: 5, value: 72.5 },
          { reps: 5, value: 72.5 },
          { reps: 5, value: 72.5 },
          { reps: 5, value: 72.5 },
          { reps: 5, value: 72.5 }
        ]
      },
      {
        date: "05/10/2018",
        netWeight: 75 * 3 * 5,
        sets: [
          { reps: 3, value: 75 },
          { reps: 3, value: 75 },
          { reps: 3, value: 75 },
          { reps: 3, value: 75 },
          { reps: 3, value: 75 }
        ]
      },
      {
        date: "06/10/2018",
        netWeight: 72.5 * 4 * 5,
        sets: [
          { reps: 4, value: 72.5 },
          { reps: 4, value: 72.5 },
          { reps: 4, value: 72.5 },
          { reps: 4, value: 72.5 },
          { reps: 4, value: 72.5 }
        ]
      },
      {
        date: "07/10/2018",
        netWeight: 72.5 * 5 * 5,
        sets: [
          { reps: 5, value: 72.5 },
          { reps: 5, value: 72.5 },
          { reps: 5, value: 72.5 },
          { reps: 5, value: 72.5 },
          { reps: 5, value: 72.5 }
        ]
      }
    ]
  };

  public componentWillMount() {
    const currentId = this.props.navigation.getParam("exerciseId");
    const currentExercise = exercises.filter(
      excersise => excersise.id === currentId
    )[0];
    if (currentExercise) {
      this.setState({
        title: currentExercise.title
      });
    }
  }

  public render() {
    const { title, history, unit, personBest } = this.state;
    return (
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center"
          }}
        >
          <ExerciseSessionChart personBest={personBest} sessions={history} />
        </View>
        {history.map(({ date, netWeight, sets }) => (
          <ExerciseSessionCard
            key={date}
            date={date}
            netWeight={netWeight}
            unit={unit}
            sets={sets}
          />
        ))}
      </ScrollView>
    );
  }
}

export default Exercise;
