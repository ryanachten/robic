import * as React from 'react';
import { ScrollView } from 'react-native';
import { ExerciseCard, ScreenHeader } from '../components';
import mockExercises from '../mock_data/exercises';
import sessions from '../mock_data/sessions';

class Session extends React.Component {

  public static navigationOptions = ({ navigation }) => {
    const sessionTitle = navigation.state.params.sessionTitle;
    return {
      title: sessionTitle ? sessionTitle : 'Session',
    };
  }

  public state = {
    exercises: null,
    title: '',
  };

  public componentWillMount() {
    const currentId = this.props.navigation.getParam('sessionId');
    const currentSession = sessions.filter(session => session.id === currentId)[0];
    if (currentSession) {
      this.setState({
        exercises: currentSession.exercises,
        title: currentSession.title,
      });
    }
  }

  public renderExercise(exercise) {
    const data = mockExercises.filter(_exercise => _exercise.id === exercise.id)[0];
    if (!data) return null;
    return (
      <ExerciseCard
        key={data.id}
        title={data.title}
      />
    );
  }

  public render() {
    const { title, exercises } = this.state;
    return (
      <ScrollView>
        <ScreenHeader>{title}</ScreenHeader>
        {exercises.map(currentExercise => this.renderExercise(currentExercise))}
      </ScrollView>
    );
  }
}

export default Session;
