import {  StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TaskLayout({
  taskTitle,
  deleteTask,
  viewTask,
  addToCompleted,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => viewTask(taskTitle.title)}
    >
      <View style={styles.taskBg}>
        <Text style={styles.taskTitle} numberOfLines={1}>
          {taskTitle.title}
        </Text>
        {/* <Button title='Delete' onPress={()=>deleteTask(taskTitle.key)}/> */}
        <View style={styles.buttons}>
          {addToCompleted != null && (
            <TouchableOpacity
              style={styles.deleteBtn}
              activeOpacity={0.8}
              onPress={() => addToCompleted(taskTitle.key)}
            >
              <Ionicons name="checkmark-done-circle" size={20} color="green" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.deleteBtn}
            activeOpacity={0.8}
            onPress={() => deleteTask(taskTitle.key)}
          >
            <Ionicons name="trash-outline" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  taskBg: {
    marginTop: 10,
    width: "90%",
    height: 60,
    backgroundColor: "#1c2c3d",
    // backgroundColor: "#f05b88",
    alignSelf: "center",
    borderRadius: 17,
    justifyContent: "center",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    maxWidth: "70%",
  },
  deleteBtn: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  buttons: {
    flexDirection: "row",
  },
});
