import * as React from 'react';
import { ScrollView } from 'react-native';
import { ScreenHeader, SearchBar, SessionCard } from '../components';
import mockData from '../mockData';

class Sessions extends React.Component {

  public static navigationOptions = {
    title: 'Sessions',
  };

  public render() {
    return (
      <ScrollView>
        <SearchBar />
        {mockData.map(session => (
          <SessionCard
            key={session.id}
            onPress={() => this.navigateToSession(session)}
            {...session}
          />
        ))}
      </ScrollView>
    );
  }

  private navigateToSession(session) {
    this.props.navigation.navigate('Session', {
      sessionId: session.id,
      sessionTitle: session.title,
    });
  }
}

export default Sessions;
