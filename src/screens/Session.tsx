import * as React from 'react';
import { ScrollView } from 'react-native';
import { ScreenHeader } from '../components';
import mockData from '../mockData';

class Session extends React.Component {

  public static navigationOptions = ({ navigation }) => {
    const sessionTitle = navigation.state.params.sessionTitle;
    return {
      title: sessionTitle ? sessionTitle : 'Session',
    };
  }

  public state = {
    title: '',
  };

  public componentWillMount() {
    const currentId = this.props.navigation.getParam('sessionId');
    const currentSession = mockData.filter(session => session.id === currentId)[0];
    if (currentSession) {
      this.setState({
        title: currentSession.title,
      });
    }
  }

  public render() {
    return (
      <ScrollView>
        <ScreenHeader>Session Name</ScreenHeader>
      </ScrollView>
    );
  }
}

export default Session;
