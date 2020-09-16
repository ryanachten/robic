import React, {
  useContext,
  useReducer,
  useEffect,
  useState,
  Dispatch,
} from 'react';
import { StyleSheet, Picker, ScrollView } from 'react-native';
import { Text } from '../components/Themed';
import { AuthContext, UserContext } from '../services/context';
import {
  exerciseDefinitionReducer,
  initialExerciseDefinitionState,
  exerciseDefinitionActions,
} from '../reducers/exerciseDefinition';
import { ExerciseDefinition } from '../constants/Interfaces';
import { ExerciseForm } from '../components/ExerciseForm';

export default function HomeScreen() {
  const {
    actions: { signOut },
  } = useContext(AuthContext);
  const {
    state: { firstName },
  } = useContext(UserContext);

  const [{ definitions }, definitionDispatch] = useReducer(
    exerciseDefinitionReducer,
    initialExerciseDefinitionState
  );

  const [selectedDefintion, setSelectedDefinition]: [
    ExerciseDefinition | undefined,
    Dispatch<ExerciseDefinition>
  ] = useState();

  useEffect(() => {
    exerciseDefinitionActions(definitionDispatch).getDefinitions();
  }, []);

  return (
    <ScrollView>
      <Text style={styles.title}>{firstName}</Text>
      {/* TODO: decide whether to use this R/N Picker or NativeBase picker */}
      <Picker
        selectedValue={selectedDefintion?.id}
        onValueChange={(id) => {
          const definition = definitions.find((def) => def.id === id);
          definition && setSelectedDefinition(definition);
        }}
      >
        {definitions.map((defintion) => {
          const { title, id } = defintion;
          return <Picker.Item key={id} label={title} value={id} />;
        })}
      </Picker>
      {selectedDefintion && <ExerciseForm definition={selectedDefintion} />}
      {/* <Button title="Log out" onPress={signOut} /> */}
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
