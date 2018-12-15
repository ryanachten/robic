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
    flippedCard: null,
    sets: [
      { reps: '5', unitValue: '15' },
      { reps: '5', unitValue: '25' },
      { reps: '5', unitValue: '35' },
      { reps: '5', unitValue: '45' },
      { reps: '5', unitValue: '55' },
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

  public handleDeleteSet(index) {
    const sets = this.state.sets;
    sets.splice(index, 1);
    this.setState({
      flippedCard: null,
      sets,
    });
  }

  public handleFlipCard(index) {
    this.setState({
      flippedCard: index,
    });
  }

  public cancelFlipCard() {
    this.setState({
      flippedCard: null,
    });
  }

  public render() {
    const { title, sets, unit, flippedCard } = this.state;
    return (
      <ScrollView>
        <ScreenHeader>Sets</ScreenHeader>
        {sets.map(({ reps, unitValue }, index) => {
          return (
            <SetCard
              flipCard={ () => this.handleFlipCard(index) }
              flipped={flippedCard === index}
              key={index}
              onCancel={() => this.cancelFlipCard()}
              onDelete={() => this.handleDeleteSet(index)}
              reps={reps}
              setNumber={index}
              unit={unit}
              value={unitValue}
            />
          );
        })}
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
