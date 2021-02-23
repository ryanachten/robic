import {
  Button,
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
import { StyleSheet, View } from "react-native";
import { ModalBackground } from "../../constants/Colors";
import { Margin } from "../../constants/Sizes";
import { ExerciseContext } from "../../services/context";
import { formatRelativeDate } from "../../utilities/dateHelpers";

export const ExerciseHistory = () => {
  const {
    state: { exercises },
    actions: { deleteExercise },
  } = useContext(ExerciseContext);

  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <Text category="h5" style={styles.modalTitle}>
            Warning
          </Text>
          <Text style={styles.modalSubtitle}>
            Are you sure you want to delete this exercise?
          </Text>
          <View style={styles.modalButtonWrapper}>
            <Button status="danger" onPress={() => setVisible(false)}>
              Delete
            </Button>
            <Button status="basic" onPress={() => setVisible(false)}>
              Cancel
            </Button>
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
          {exercises.map(({ date, sets }, index) => (
            <MenuItem
              key={index}
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
                    {sets.map(({ reps, value }, i) => (
                      <Text
                        {...props}
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
                  onPress={() => setVisible(true)}
                />
              )}
            />
          ))}
        </MenuGroup>
      </Menu>
    </>
  );
};

const styles = StyleSheet.create({
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
