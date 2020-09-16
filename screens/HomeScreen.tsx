import React, { useContext, useReducer, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from 'native-base';
import { Text, View } from '../components/Themed';
import { AuthContext, UserContext } from '../services/context';
import {
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
  exerciseDefinitionActions,
} from '../reducers/exerciseDefinition';

export default function HomeScreen() {
  const {
    actions: { signOut },
  } = useContext(AuthContext);
  const {
    state: { firstName },
  } = useContext(UserContext);

  const [definitionState, definitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );

  useEffect(() => {
    exerciseDefinitionActions(definitionDispatch).getDefinitions();
  }, []);

  const [selectedDefintion, setSelectedDefinition] = useState();

  return (
    <View>
      <Picker
        mode="dropdown"
        placeholder="Select exercise"
        selectedValue={selectedDefintion}
        onValueChange={setSelectedDefinition}
      >
        {definitionState.definitions.map((defintion) => {
          const { title, id } = defintion;
          return <Picker.Item key={id} label={title} value={defintion} />;
        })}
      </Picker>
      <Button title="Log out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
