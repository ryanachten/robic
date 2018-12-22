import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, FormInput, FormLabel, Icon, Text } from "react-native-elements";
import { Button, IconButton, SearchBar } from "../../components";

export class ExerciseFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      sortBy: "title"
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  public updateSortBy(field) {
    this.setState({
      sortBy: field
    });
  }

  public updateSearchTerm(term) {
    this.setState({
      searchTerm: term
    });
  }

  public onSubmit() {
    const { searchTerm, sortBy } = this.state;
    const submitExerciseFilter = this.props.submitExerciseFilter;
    return submitExerciseFilter({ searchTerm, sortBy });
  }

  public render() {
    const { containerStyle, onFormClose } = this.props;
    const sortBy = this.state.sortBy;
    return (
      <Card containerStyle={[styles.formContainer, containerStyle]}>
        <Text style={styles.formHeader}>Filter Exercises</Text>
        <FormLabel>Search</FormLabel>
        <View style={styles.searchWrapper}>
          <Icon name="search" />
          <FormInput
            containerStyle={{ flex: 1 }}
            placeholder="Find exercise"
            onChangeText={text => this.updateSearchTerm(text)}
          />
        </View>
        <FormLabel>Sort by</FormLabel>
        <View style={styles.buttonWrapper}>
          <Button
            iconName="sort-by-alpha"
            buttonStyle={sortBy === "title" ? styles.activeFilter : null}
            onPress={() => this.updateSortBy("title")}
            title="Title"
          />
          <Button
            iconName="date-range"
            title="Date"
            onPress={() => this.updateSortBy("date")}
            buttonStyle={sortBy === "date" ? styles.activeFilter : null}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <IconButton color="red" name="close" onPress={onFormClose} />
          <IconButton
            color="green"
            name="done"
            onPress={() => this.onSubmit()}
          />
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  activeFilter: {
    backgroundColor: "rgb(200, 200, 200)"
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%"
  },
  formContainer: {
    flex: 1
  },
  formHeader: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  },
  input: {
    marginTop: 15
  },
  searchWrapper: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%"
  }
});
