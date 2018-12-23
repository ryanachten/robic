import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { IconButton } from "../../components";

export class ExerciseSessionCard extends React.Component {
  public state = {
    expanded: false
  };

  public toggleExpandCard() {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  public renderExpanded() {
    const { unit, sets } = this.props;
    return (
      <View>
        {sets.map(({ reps, value }, index) => (
          <Card>
            <Text>Set {index}</Text>
            <Text>Reps: {reps}</Text>
            <Text>
              Value: {value} {unit}
            </Text>
          </Card>
        ))}
      </View>
    );
  }

  public render() {
    const expanded = this.state.expanded;
    const { date, netWeight, unit } = this.props;
    return (
      <Card>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text>{date}</Text>
            <Text>{`Net weight: ${netWeight} ${unit}`}</Text>
          </View>
          <IconButton
            color="black"
            name={expanded ? "expand-less" : "expand-more"}
            onPress={() => this.toggleExpandCard()}
          />
        </View>
        {expanded && this.renderExpanded()}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  headerText: {
    flexGrow: 1
  }
});
