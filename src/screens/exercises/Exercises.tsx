import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-elements';
import {
  Button,
  ExerciseCard,
  IconButton,
  ScreenHeader,
  SearchBar,
  SessionCard,
} from '../../components';
import sessions from '../../mock_data/sessions';

class Exercises extends React.Component {

  public static navigationOptions = {
    title: 'Exercises',
  };

  public state = {
    showSearchBar: false,
    exercises: [
      {
        title: 'Benchpress',
        lastWeightChange: { delta: 10, sign: 'positive', unit: 'kg' },
        personalBest: { reps: 1, value: 95, unit: 'kg' },
      },
    ],
  };

  public toggleSearchBar() {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar,
    }));
  }

  public renderButtons() {
    const { showSearchBar } = this.state;
    if (showSearchBar) {
      return (
        <View style={styles.buttonContainer}>
          <SearchBar
            placeholder="Find exercise"
          />
          <IconButton
            color="red"
            name="clear"
            onPress={() => this.toggleSearchBar()}
          />
        </View>
      );
    }
    return (
      <View style={styles.buttonContainer}>
        <IconButton
          color="black"
          name="search"
          onPress={() => this.toggleSearchBar()}
        />
        <IconButton
          color="green"
          name="add"
          onPress={() => console.log('Add new exercise')}
        />
      </View>
    );
  }

  public render() {
    const { lastWeightChange, personalBest, title } = this.state.exercises[0];
    return (
      <ScrollView>
        <View style={styles.searchContainer}>
          {this.renderButtons()}
        </View>
        <ExerciseCard
          key={title}
          date="07/10/2018"
          personalBest={personalBest}
          lastWeightChange={lastWeightChange}
          onPress={() => console.log('exerise pressed', title)}
          title={title}
        />
      </ScrollView>
    );
  }

  // private navigateToSession(session) {
  //   this.props.navigation.navigate('Session', {
  //     sessionId: session.id,
  //     sessionTitle: session.title,
  //   });
  // }
}

export default Exercises;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cancelButton: {
    marginTop: 20,
  },
  searchContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 20,
  },
});
