import * as React from 'react';
import { ScrollView } from 'react-native';
import { Button, ExerciseCard, ScreenHeader, SetCard } from '../components';
import exercises from '../mock_data/exercises';

class Exercise extends React.Component {

  public static navigationOptions = ({ navigation }) => {
    const exerciseTitle = navigation.state.params.exerciseTitle;
    return {
      title: exerciseTitle ? exerciseTitle : 'Exercise',
    };
  }

  public state = {
    sets: [
      { setNumber: 0, reps: '5', unitValue: '75' },
      { setNumber: 1, reps: '5', unitValue: '75' },
      { setNumber: 2, reps: '5', unitValue: '75' },
      { setNumber: 3, reps: '5', unitValue: '75' },
      { setNumber: 4, reps: '5', unitValue: '75' },
    ],
    title: '',
    unit: 'kg',
  };

  public componentWillMount() {
    const currentId = this.props.navigation.getParam('exerciseId');
    const currentExercise = exercises.filter(excersise => excersise.id === currentId)[0];
    if (currentExercise) {
      this.setState({
        title: currentExercise.title,
      });
    }
  }

  public render() {
    const { title, sets, unit } = this.state;
    return (
      <ScrollView>
        <ScreenHeader>Sets</ScreenHeader>
        {sets.map(({ reps, setNumber, unitValue }) => (
          <SetCard
            key={setNumber}
            reps={reps}
            value={unitValue}
            unit={unit}
          />
        ))}
        <Button
          iconName="add"
          title="Add new set"
          containerStyle={{
            marginTop: 20,
          }}
        />
      </ScrollView>
    );
  }
}

export default Exercise;
