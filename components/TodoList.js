import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import colors from "../Colors";
import TodoModal from "./TodoModal";

export default class TodoList extends React.Component {
  state = {
    showListVisible: false,
  };

  toddleListModal() {
    this.setState({ showListVisible: !this.state.showListVisible });
  }

  render() {
    const list = this.props.list;

    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;

    return (
      <View>
        <Modal
          animationType='slide'
          visible={this.state.showListVisible}
          onRequestClose={() => this.toddleListModal()}
        >
          <TodoModal
            list={list}
            closeModal={() => this.toddleListModal()}
            updateList={this.props.updateList}
          />
        </Modal>
        <TouchableOpacity
          style={[styles.listContainer, { backgroundColor: list.color }]}
          onPress={() => this.toddleListModal()}
        >
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>
          <View>
            {remainingCount <= 0 && completedCount > 0 ? (
              <TouchableOpacity onPress={() => this.props.deleteList(list.id)}>
                <View style={styles.deleteButton}>
                  <Text
                    style={{
                      color: colors.white,
                      fontWeight: "700",
                    }}
                  >
                    Delete List?
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.count}>{remainingCount}</Text>
                <Text style={styles.subtitle}>Remaining</Text>
              </View>
            )}
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{completedCount}</Text>
              <Text style={styles.subtitle}>Completed</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
  deleteButton: {
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    width: 100,
    height: 50,
    borderRadius: 4,
  },
});
