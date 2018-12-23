import * as React from "react";
import { ScrollView } from "react-native";
import { Card, Text } from "react-native-elements";
import { Button, ExerciseSessionCard, ScreenHeader } from "../../components";
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
    history: [
      {
        date: "07/10/2018",
        netWeight: 72.5 * 5 * 4,
        setCount: 4,
        sets: [
          { reps: 5, value: 72.5 },
          { reps: 5, value: 72.5 },
          { reps: 5, value: 72.5 },
          { reps: 5, value: 72.5 }
        ]
      },
      {
        date: "06/10/2018",
        netWeight: 72.5 * 5 * 4,
        setCount: 4,
        sets: [
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
    const { title, history, unit } = this.state;
    return (
      <ScrollView>
        {history.map(({ date, netWeight, sets }) => (
          <ExerciseSessionCard
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
