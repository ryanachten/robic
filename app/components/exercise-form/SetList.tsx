import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { Input } from "../Input";
import { Icon } from "../Icon";
import { Margin } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";
import { ActiveSets } from "../../constants/Interfaces";

type SetListProps = {
  sets: ActiveSets[];
  updateSet: (index: number, field: "reps" | "value", value: string) => void;
  removeSet: (index: number) => void;
};

export const SetList = ({ sets, updateSet, removeSet }: SetListProps) => (
  <>
    {sets.map(({ reps, value }: ActiveSets, index: number) => {
      const activeSet = index === 0;
      const setDisplayNumber = sets.length - index;
      return (
        <View
          key={index}
          style={[styles.root, !activeSet && styles.rootInactive]}
        >
          <Text style={styles.setNumber} appearance="hint">{`${
            activeSet
              ? `Current Set (${setDisplayNumber})`
              : `Set ${setDisplayNumber}`
          } `}</Text>
          <View style={styles.inputWrapper}>
            <Input
              style={[styles.inputContainer, styles.inputRepContainer]}
              label="Reps"
              keyboardType="numeric"
              value={reps ? reps.toString() : ""}
              onChange={({ nativeEvent }) =>
                updateSet(index, "reps", nativeEvent.text)
              }
            />
            <Input
              style={styles.inputContainer}
              label="Weight"
              keyboardType="numeric"
              value={value ? value.toString() : ""}
              onChange={({ nativeEvent }) =>
                updateSet(index, "value", nativeEvent.text)
              }
            />
            {!activeSet && (
              <Icon
                size="sm"
                fill={Colors.orange}
                style={styles.inputWrapperDeleteIcon}
                name="slash-outline"
                onPress={() => removeSet(index)}
              />
            )}
          </View>
        </View>
      );
    })}
  </>
);

const styles = StyleSheet.create({
  inputWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    marginBottom: Margin.md,
  },
  root: {
    borderBottomColor: Colors.lilac,
    borderBottomWidth: 1,
    marginBottom: Margin.md,
  },
  rootInactive: {
    opacity: 0.5,
  },
  inputContainer: {
    flexGrow: 1,
    width: "30%",
  },
  inputWrapperDeleteIcon: {
    marginLeft: Margin.sm,
  },
  inputRepContainer: {
    marginRight: Margin.sm,
  },
  setNumber: {
    marginBottom: Margin.sm,
  },
});
