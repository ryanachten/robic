import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { Set } from "../../constants/Interfaces";
import { Input } from "../Input";
import { Card } from "../Card";
import { Icon } from "../Icon";
import { Margin } from "../../constants/Sizes";
import { Colors } from "../../constants/Colors";

type SetListProps = {
  sets: Set[];
  updateSet: (index: number, field: "reps" | "value", value: string) => void;
  removeSet: (index: number) => void;
};

export const SetList = ({ sets, updateSet, removeSet }: SetListProps) => (
  <>
    {sets.map(({ reps, value }: Set, index: number) => {
      const activeSet = index === 0;
      const setDisplayNumber = sets.length - index;
      return (
        <View key={index} style={[!activeSet && styles.inputWrapperInactive]}>
          <Text style={styles.setNumber} appearance="hint">{`${
            activeSet
              ? `Current Set (${setDisplayNumber})`
              : `Set ${setDisplayNumber}`
          } `}</Text>
          <Card style={styles.inputWrapper}>
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
          </Card>
        </View>
      );
    })}
  </>
);

const styles = StyleSheet.create({
  inputWrapper: {
    alignItems: "center",
    marginBottom: Margin.sm,
  },
  inputWrapperInactive: {
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
