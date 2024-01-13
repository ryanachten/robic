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
import React, { useContext, useState } from "react";
import { ImageProps, StyleSheet, TextProps, View } from "react-native";
import { ModalBackground } from "../../constants/Colors";
import { Margin } from "../../constants/Sizes";
import { ExerciseContext } from "../../services/context";
import { formatRelativeDate } from "../../utilities/dateHelpers";
import { Button } from "../Button";
import { ErrorToast } from "../ErrorToast";
import { Set } from "../../api";

export const ExerciseHistory = () => {
  const {
    state: { exercises, error, loadingDeleteExercise },
    actions: { deleteExercise },
  } = useContext(ExerciseContext);

  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const [visible, setVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const toggleModal = (active: boolean, id: number | null = null) => {
    if (active && id) {
      setVisible(true);
      setDeleteId(id);
    } else {
      setVisible(false);
      setDeleteId(null);
    }
  };

  const deleteExerciseById = async (id: number | null = null) => {
    if (id !== undefined && id !== null) {
      await deleteExercise(id);
    }
    toggleModal(false);
  };

  if (!exercises || exercises.length === 0) {
    return null;
  }

  const renderHistoryIcon = (props: Partial<ImageProps> | undefined) => (
    <Icon {...props} name="clock-outline" />
  );

  const renderTitle = (
    props: Partial<TextProps> | undefined,
    sets: Set[],
    date: string
  ) => (
    <View style={styles.itemContent}>
      <Text {...props} category="s1" style={[props?.style, styles.itemTitle]}>
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
  );

  const renderDeleteIcon = (
    props: Partial<ImageProps> | undefined,
    exerciseId: number
  ) => (
    <Icon
      {...props}
      name="slash-outline"
      onPress={() => toggleModal(true, exerciseId)}
    />
  );

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
              loading={loadingDeleteExercise}
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
        style={styles.menu}
      >
        <MenuGroup title="History" accessoryLeft={renderHistoryIcon}>
          {exercises
            .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
            .map(({ id, date, sets }, i) => (
              <MenuItem
                key={i}
                title={(props) => renderTitle(props, sets, date)}
                accessoryRight={(props) => renderDeleteIcon(props, id)}
              />
            ))}
        </MenuGroup>
      </Menu>
      <ErrorToast error={error} />
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
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
