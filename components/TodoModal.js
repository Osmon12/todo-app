import React, { Component } from "react";
import {
  Animated,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../Colors";

export default class TodoModal extends Component {
  state = {
    newTodo: "",
  };

  toggleTodoCompleted(index) {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  }

  addTodo = () => {
    let list = this.props.list;

    if (!list.todos.some((todo) => todo.title === this.state.newTodo)) {
      list.todos.push({ title: this.state.newTodo, completed: false });
      this.props.updateList(list);
    }

    this.setState({ newTodo: "" });
    Keyboard.dismiss();
  };

  deleteTodo = (index) => {
    let list = this.props.list;
    list.todos.splice(index, 1);

    this.props.updateList(list);
  };

  renderTodo(todo, index) {
    return (
      <View style={styles.todoContainer}>
        <View style={styles.todoContainer}>
          <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
            <Ionicons
              name={
                todo.completed ? "ios-checkmark-done" : "ios-square-outline"
              }
              size={24}
              color={todo.completed ? "#39e10f" : colors.gray}
              style={{ width: 32 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
            <Text
              style={[
                styles.todo,
                {
                  textDecorationLine: todo.completed ? "line-through" : "none",
                  color: todo.completed ? colors.gray : colors.black,
                },
              ]}
            >
              {todo.title}
            </Text>
          </TouchableOpacity>
        </View>

        {todo.completed && this.rightActions(index)}
      </View>
    );
  }

  rightActions = (index) => {
    return (
      <TouchableOpacity onPress={() => this.deleteTodo(index)}>
        <View style={styles.deleteButton}>
          <Text
            style={{
              color: colors.white,
              fontWeight: "800",
            }}
          >
            Delete
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : ""}
      >
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 32, right: 32, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name='close' size={24} color={colors.black} />
          </TouchableOpacity>

          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: list.color },
            ]}
          >
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount}
            </Text>
          </View>

          <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) => this.renderTodo(item, index)}
              keyExtractor={(item, index) => item.title + index}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={(text) => this.setState({ newTodo: text })}
              value={this.state.newTodo}
            />
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: list.color }]}
              onPress={() => this.addTodo()}
            >
              <AntDesign name='plus' size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
    paddingTop: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 32,
  },
  todo: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 40,
  },
});
