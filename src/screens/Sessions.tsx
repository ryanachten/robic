import * as React from 'react';
import { ScrollView } from 'react-native';
import { Card, SearchBar, Text } from 'react-native-elements';
import { ScreenHeader, SessionCard } from '../components';

const sessions = [
  {
    date: '08/10/2018',
    excerciseCount: 8,
    title: 'Chest and back',
  },
  {
    date: '07/10/2018',
    excerciseCount: 10,
    title: 'Legs',
  },
  {
    date: '06/10/2018',
    excerciseCount: 4,
    title: 'Cardio 1',
  },
  {
    date: '05/10/2018',
    excerciseCount: 8,
    title: 'Arms',
  },
];

class Sessions extends React.Component {

  public render() {
    return (
      <ScrollView>
        <ScreenHeader>Sessions</ScreenHeader>
        {/* <SearchBar /> */}
        {sessions.map(session => (
          <SessionCard {...session}/>
        ))}
      </ScrollView>
    );
  }
}

export default Sessions;
