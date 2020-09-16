import React, { useContext, useReducer, useEffect, useState } from 'react';
import { StyleSheet, View, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { Text } from '../components/Themed';
import { AuthContext, UserContext } from '../services/context';
import {
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
  exerciseDefinitionActions,
} from '../reducers/exerciseDefinition';
import { ScrollView } from 'react-native-gesture-handler';
import { ExerciseDefinition } from '../constants/Interfaces';

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

  const [selectedDefintion, setSelectedDefinition] = useState(
    definitionState.definitions[0]
  );

  return (
    <ScrollView>
      <Text style={styles.title}>{firstName}</Text>
      {/* TODO: decide whether to use this R/N Picker or NativeBase picker */}
      <Picker
        selectedValue={selectedDefintion}
        onValueChange={setSelectedDefinition}
      >
        {definitionState.definitions.map((defintion) => {
          const { title, id } = defintion;
          return <Picker.Item key={id} label={title} value={id} />;
        })}
      </Picker>
      <Button title="Log out" onPress={signOut} />
    </ScrollView>
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
