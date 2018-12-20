import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card, Divider, FormInput } from "react-native-elements";
import { Button, IconButton } from "..";

export class SetCard extends React.Component {
  public renderDeleteCard() {
    const { onCancel, onDelete } = this.props;
    return (
      <React.Fragment>
        <View style={styles.buttonWrapper}>
          <Button iconName="delete" onPress={onDelete} title="Remove set" />
          <Button iconName="close" onPress={onCancel} title="Cancel" />
        </View>
      </React.Fragment>
    );
  }

  public renderNormalCard() {
    const {
      onRepValueChange,
      onUnitValueChange,
      reps,
      setNumber,
      value,
      unit
    } = this.props;
    return (
      <React.Fragment>
        <View style={styles.section}>
          <FormInput
            containerStyle={styles.input}
            onChangeText={text => onUnitValueChange(text)}
            placeholder="value"
            value={value}
          />
          <Text style={styles.unit}>{unit}</Text>
          <IconButton
            color="red"
            name="remove"
            onPress={() => onUnitValueChange("decrement")}
          />
          <IconButton
            color="green"
            name="add"
            onPress={() => onUnitValueChange("increment")}
          />
        </View>
        <View style={styles.section}>
          <FormInput
            containerStyle={styles.input}
            onChangeText={text => onRepValueChange(text)}
            placeholder="reps"
            value={reps}
          />
          <Text style={styles.unit}>reps</Text>
          <IconButton
            color="red"
            name="remove"
            onPress={() => onRepValueChange("decrement")}
          />
          <IconButton
            color="green"
            name="add"
            onPress={() => onRepValueChange("increment")}
          />
        </View>
      </React.Fragment>
    );
  }

  public render() {
    const { flipCard, flipped, reps, setNumber, value, unit } = this.props;
    return (
      <TouchableOpacity onLongPress={flipCard}>
        <Card wrapperStyle={styles.container}>
          <View style={styles.innerWrapper}>
            <Text style={styles.title}>{`Set ${setNumber + 1}`}</Text>
            <Divider style={styles.divider} />
            {flipped && this.renderDeleteCard()}
            {!flipped && this.renderNormalCard()}
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: "row",
    marginTop: 20
  },
  container: {
    flexDirection: "row",
    height: 150
  },
  divider: {
    marginBottom: 10,
    marginTop: 10
  },
  innerWrapper: {
    flex: 1
  },
  input: {
    flex: 1
  },
  section: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  title: {
    fontWeight: "bold",
    textAlign: "center"
  },
  unit: {
    flex: 1,
    fontSize: 16
  }
});
