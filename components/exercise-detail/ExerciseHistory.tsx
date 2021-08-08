import {
  Button as KittenButton,
  Card,
  Icon,
  IndexPath,
  Menu,
  MenuGroup,
  MenuItem,
  Modal,
  Text,
} from "@ui-kitten/components/ui";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import { ModalBackground } from "../../constants/Colors";
import { Margin } from "../../constants/Sizes";
import {
  getExercisesByDefinition,
  getExercisesError,
  isDeleteExerciseLoading,
} from "../../selectors/exercise.selectors";
import { formatRelativeDate } from "../../utilities/dateHelpers";
import { Button } from "../Button";
import { ErrorToast } from "../ErrorToast";

export const ExerciseHistory = ({ definitionId }: { definitionId: string }) => {
  const dispatch = useDispatch();

  const exercises = useSelector(getExercisesByDefinition(definitionId));
  const loading = useSelector(isDeleteExerciseLoading);
  const error = useSelector(getExercisesError);

  const getDefinitionExercises = () =>
    dispatch(actions.requestDefinitionExercises.started({ definitionId }));

  const deleteExercise = (exerciseId: string) =>
    dispatch(actions.deleteExercise.started({ exerciseId }));

  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const [visible, setVisible] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    getDefinitionExercises();
  }, [definitionId]);

  const toggleModal = (active: Boolean, id?: string) => {
    if (active && id) {
      setVisible(true);
      setDeleteId(id);
    } else {
      setVisible(false);
      setDeleteId("");
    }
  };

  const deleteExerciseById = async (id: string) => {
    await deleteExercise(id);
    toggleModal(false);
  };

  if (!exercises || exercises.length === 0) {
    return null;
  }

  return (
    <>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => toggleModal(false)}
      >
        <Card disabled={true}>
          <Text category="h5" style={styles.modalTitle}>
            Warning
          </Text>
          <Text style={styles.modalSubtitle}>
            Are you sure you want to delete this exercise?
          </Text>
          <View style={styles.modalButtonWrapper}>
            <Button
              loading={loading}
              status="danger"
              onPress={() => deleteExerciseById(deleteId)}
            >
              Delete
            </Button>
            <KittenButton status="basic" onPress={() => toggleModal(false)}>
              Cancel
            </KittenButton>
          </View>
        </Card>
      </Modal>
      <Menu
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <MenuGroup
          title="History"
          accessoryLeft={(props) => <Icon {...props} name="clock-outline" />}
        >
          {exercises.map(({ id, date, sets }, i) => (
            <MenuItem
              style={styles.menuItem}
              key={i}
              title={(props) => (
                <View style={styles.itemContent}>
                  <Text
                    {...props}
                    category="s1"
                    style={[props?.style, styles.itemTitle]}
                  >
                    {formatRelativeDate(date)}
                  </Text>
                  <View style={styles.setWrapper}>
                    {sets.map(({ reps, value }, j) => (
                      <Text
                        {...props}
                        key={j}
                        style={[props?.style, styles.setText]}
                        category="p2"
                      >
                        {`${reps} reps x ${value} kg`}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
              accessoryRight={(props) => (
                <Icon
                  {...props}
                  name="slash-outline"
                  onPress={() => toggleModal(true, id)}
                />
              )}
            />
          ))}
        </MenuGroup>
      </Menu>
      <ErrorToast error={error} />
    </>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    maxWidth: "100%",
  },
  itemContent: {
    display: "flex",
    width: "90%",
    paddingBottom: Margin.sm,
    paddingTop: Margin.sm,
  },
  itemTitle: {
    minHeight: 20,
  },
  setText: {
    fontWeight: "normal",
  },
  setWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  backdrop: {
    backgroundColor: ModalBackground,
  },
  modalTitle: { marginBottom: Margin.sm, textAlign: "center" },
  modalSubtitle: {
    marginBottom: Margin.md,
    textAlign: "center",
  },
  modalButtonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
