import {
  Icon,
  IndexPath,
  Menu,
  MenuGroup,
  MenuItem,
  Text,
} from "@ui-kitten/components/ui";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Margin } from "../../constants/Sizes";
import { ExerciseState } from "../../reducers/exercise";
import { formatRelativeDate } from "../../utilities/dateHelpers";

export const ExerciseHistory = ({ exercises }: ExerciseState) => {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );
  return (
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
            accessoryRight={(props) => <Icon {...props} name="slash-outline" />}
          />
        ))}
      </MenuGroup>
    </Menu>
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
});
