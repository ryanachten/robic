import * as React from 'react';
import { ScrollView } from 'react-native';
import { ScreenHeader, SearchBar, SessionCard } from '../../components';
import sessions from '../../mock_data/sessions';

class Sessions extends React.Component {

  public static navigationOptions = {
    title: 'Sessions',
  };

  public render() {
    return (
      <ScrollView>
        <ScreenHeader>Start new session</ScreenHeader>
        <SearchBar />
        {sessions.map(session => (
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
